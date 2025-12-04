import { streamText, generateText, embed, embedMany } from 'ai';
import { ConfigLoader } from './config/loader';
import { ModelRegistry } from './providers/registry';
import { CostTracker } from './cost/tracker';
import { addAnthropicCacheControl } from './caching/anthropic';
import { voyageEmbed, voyageRerank, isVoyageAvailable } from './providers/adapters/voyage';
import { cohereRerank, isCohereAvailable } from './providers/adapters/cohere';
import type {
  LLMServiceConfig,
  TextRequestOptions,
  EmbedRequestOptions,
  RerankRequestOptions,
  RerankResult,
  UsageSummary,
  UsageRecord,
  ReasoningOverride,
  LLMServiceEvent,
  LLMServiceEventHandler,
} from './types';

export class LLMService {
  private configLoader: ConfigLoader;
  private registry: ModelRegistry;
  private costTracker: CostTracker;

  constructor(config: LLMServiceConfig) {
    this.configLoader = new ConfigLoader(config.environment);

    // Load models config
    const modelsConfig = this.configLoader.loadModelsConfig(config.modelsConfig);

    // Load roles config if provided
    if (config.rolesConfig) {
      this.configLoader.loadRolesConfig(config.rolesConfig);
    }

    // Initialize registry and cost tracker
    this.registry = new ModelRegistry(modelsConfig);
    this.costTracker = new CostTracker(
      modelsConfig.models,
      config.pricingCache
    );
  }

  async streamText(options: TextRequestOptions): Promise<ReturnType<typeof streamText>> {
    const { model, providerOptions, messages } = this.resolveRequest(options);
    const startTime = Date.now();

    const result = await streamText({
      model: model.instance,
      messages: messages as any,
      system: options.system,
      tools: options.tools as any,
      abortSignal: options.abortSignal,
      providerOptions: {
        ...model.providerOptions,
        ...providerOptions,
      } as any,
      onFinish: async ({ usage }) => {
        const usageAny = usage as any;
        await this.costTracker.track({
          model: model.alias,
          role: options.role,
          variant: options.variant,
          inputTokens: usageAny.promptTokens ?? usageAny.inputTokens ?? 0,
          outputTokens: usageAny.completionTokens ?? usageAny.outputTokens ?? 0,
          cachedTokens: usageAny.cachedTokens,
          reasoningTokens: usageAny.reasoningTokens,
          latencyMs: Date.now() - startTime,
        });
      },
    });

    return result;
  }

  async generateText(options: TextRequestOptions): Promise<Awaited<ReturnType<typeof generateText>>> {
    const { model, providerOptions, messages } = this.resolveRequest(options);
    const startTime = Date.now();

    const result = await generateText({
      model: model.instance,
      messages: messages as any,
      system: options.system,
      tools: options.tools as any,
      abortSignal: options.abortSignal,
      providerOptions: {
        ...model.providerOptions,
        ...providerOptions,
      } as any,
    });

    const usageAny = result.usage as any;
    await this.costTracker.track({
      model: model.alias,
      role: options.role,
      variant: options.variant,
      inputTokens: usageAny.promptTokens ?? usageAny.inputTokens ?? 0,
      outputTokens: usageAny.completionTokens ?? usageAny.outputTokens ?? 0,
      cachedTokens: usageAny.cachedTokens,
      reasoningTokens: usageAny.reasoningTokens,
      latencyMs: Date.now() - startTime,
    });

    return result;
  }

  async embed(options: EmbedRequestOptions): Promise<{ embedding: number[]; embeddings: number[][] }> {
    const modelAlias = this.resolveModelAlias(options);
    const config = this.registry.getModelConfig(modelAlias);

    // Use Voyage native SDK for Voyage models
    if (config.provider === 'voyage') {
      if (!isVoyageAvailable()) {
        throw new Error('VOYAGE_API_KEY not configured');
      }
      
      const values = Array.isArray(options.value) ? options.value : [options.value];
      const embeddings = await voyageEmbed(values, config);
      
      return {
        embedding: embeddings[0],
        embeddings,
      };
    }

    // Use AI SDK for other providers
    const { instance } = this.registry.getEmbeddingModel(modelAlias);

    if (Array.isArray(options.value)) {
      const { embeddings } = await embedMany({
        model: instance,
        values: options.value,
      });
      return {
        embedding: embeddings[0],
        embeddings,
      };
    }

    const { embedding } = await embed({
      model: instance,
      value: options.value,
    });

    return {
      embedding,
      embeddings: [embedding],
    };
  }

  async rerank(options: RerankRequestOptions): Promise<RerankResult[]> {
    const modelAlias = this.resolveModelAlias(options);
    const config = this.registry.getModelConfig(modelAlias);

    // Filter empty documents
    const validDocs = options.documents.filter((d) => d && d.trim().length > 0);
    if (validDocs.length === 0) {
      return [];
    }

    try {
      if (config.provider === 'voyage') {
        if (!isVoyageAvailable()) {
          throw new Error('VOYAGE_API_KEY not configured');
        }
        return await voyageRerank(options.query, validDocs, config, options.topN);
      }

      if (config.provider === 'cohere') {
        if (!isCohereAvailable()) {
          throw new Error('COHERE_API_KEY not configured');
        }
        return await cohereRerank(options.query, validDocs, config, options.topN);
      }

      throw new Error(`Reranking not supported for provider: ${config.provider}`);
    } catch (error) {
      // Try fallback if configured
      const fallbackAlias = this.getRoleFallback(options.role);
      if (fallbackAlias) {
        console.warn(
          `[LLMService] Reranking failed with ${modelAlias}, trying fallback ${fallbackAlias}`
        );
        return this.rerank({
          ...options,
          model: fallbackAlias,
          role: undefined,
        });
      }
      throw error;
    }
  }

  private resolveRequest(options: TextRequestOptions) {
    const modelAlias = this.resolveModelAlias(options);
    const overrides = this.resolveOverrides(options);

    const model = this.registry.getLanguageModel(modelAlias, overrides?.reasoning);

    // Apply Anthropic cache control if applicable
    const messages = addAnthropicCacheControl(options.messages, model.config);

    // Merge parameter overrides
    const providerOptions: Record<string, unknown> = {};
    if (overrides?.parameters) {
      if (overrides.parameters.temperature !== undefined) {
        providerOptions.temperature = overrides.parameters.temperature;
      }
      if (overrides.parameters.max_tokens !== undefined) {
        providerOptions.maxTokens = overrides.parameters.max_tokens;
      }
    }

    return { model, providerOptions, messages };
  }

  private resolveModelAlias(options: { model?: string; role?: string; variant?: string }): string {
    if (options.model) {
      return options.model;
    }

    if (options.role) {
      const rolesConfig = this.configLoader.getRolesConfig();
      if (!rolesConfig) {
        throw new Error('Roles config not loaded');
      }

      const resolved = this.configLoader.resolveRole(options.role, options.variant);
      return resolved.modelAlias;
    }

    throw new Error('Either model or role must be specified');
  }

  private resolveOverrides(options: TextRequestOptions): {
    reasoning?: ReasoningOverride;
    parameters?: { temperature?: number; max_tokens?: number };
  } | undefined {
    if (options.role) {
      const resolved = this.configLoader.resolveRole(options.role, options.variant);
      
      // Merge role overrides with request overrides
      return {
        reasoning: {
          ...resolved.overrides?.reasoning,
          ...options.reasoning,
        },
        parameters: {
          ...resolved.overrides?.parameters,
          ...options.parameters,
        },
      };
    }

    if (options.reasoning || options.parameters) {
      return {
        reasoning: options.reasoning,
        parameters: options.parameters,
      };
    }

    return undefined;
  }

  private getRoleFallback(roleName?: string): string | null {
    if (!roleName) return null;
    return this.configLoader.getRoleFallback(roleName);
  }

  // Cost tracking methods
  getUsage(): UsageSummary {
    return this.costTracker.getSummary();
  }

  getUsageRecords(): UsageRecord[] {
    return this.costTracker.getUsageRecords();
  }

  clearUsage(): void {
    this.costTracker.clearUsage();
  }

  // Event handling
  on<K extends keyof LLMServiceEvent>(
    event: K,
    handler: LLMServiceEventHandler<K>
  ): void {
    this.costTracker.on(event, handler);
  }

  off<K extends keyof LLMServiceEvent>(
    event: K,
    handler: LLMServiceEventHandler<K>
  ): void {
    this.costTracker.off(event, handler);
  }

  // Utility methods
  listModels(type?: 'language' | 'embedding' | 'reranker'): string[] {
    return this.registry.listModels(type);
  }

  getModelConfig(alias: string) {
    return this.registry.getModelConfig(alias);
  }

  // For advanced use cases - get the underlying model instance
  getLanguageModel(alias: string, overrides?: ReasoningOverride) {
    return this.registry.getLanguageModel(alias, overrides);
  }

  getEmbeddingModel(alias: string) {
    return this.registry.getEmbeddingModel(alias);
  }
}

export function createLLMService(config: LLMServiceConfig): LLMService {
  return new LLMService(config);
}
