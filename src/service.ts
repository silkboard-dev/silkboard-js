import { streamText, generateText, embed, embedMany } from 'ai';
import { ConfigLoader } from './loaders';
import { Registry } from './providers/registry';
import { CostTracker } from './cost/tracker';
import { addAnthropicCacheControl } from './caching/anthropic';
import { voyageEmbed, voyageRerank, isVoyageAvailable } from './providers/adapters/voyage';
import { cohereRerank, isCohereAvailable } from './providers/adapters/cohere';
import { SilkboardEventEmitter, generateRequestId } from './events';
import type {
  SilkboardConfig,
  TextOptions,
  EmbedOptions,
  RerankOptions,
  RerankResult,
  UsageSummary,
  UsageRecord,
  ReasoningOverride,
  SilkboardEvent,
  SilkboardEventHandler,
  ResolvedModel,
} from './types';
import { SilkboardError } from './errors';

export class Silkboard {
  private configLoader: ConfigLoader;
  private registry: Registry;
  private costTracker: CostTracker;
  private eventEmitter: SilkboardEventEmitter;

  constructor(config: SilkboardConfig) {
    this.configLoader = new ConfigLoader(config.environment);
    this.eventEmitter = new SilkboardEventEmitter();

    // Load models config
    const modelsConfig = this.configLoader.loadModelsConfig(config.modelsConfig);

    // Load roles config if provided
    if (config.rolesConfig) {
      this.configLoader.loadRolesConfig(config.rolesConfig);
    }

    // Initialize registry and cost tracker
    this.registry = new Registry(modelsConfig);
    this.costTracker = new CostTracker(
      modelsConfig.models,
      config.pricingCache,
      this.eventEmitter
    );
  }

  async streamText(options: TextOptions): Promise<ReturnType<typeof streamText>> {
    const { model, providerOptions, messages } = await this.resolveRequest(options);
    const requestId = generateRequestId();
    const startTime = Date.now();

    // Emit start event
    this.emitStartEvent(requestId, model, options);

    try {
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
          const latencyMs = Date.now() - startTime;
          const tokenUsage = {
            inputTokens: usageAny.promptTokens ?? usageAny.inputTokens ?? 0,
            outputTokens: usageAny.completionTokens ?? usageAny.outputTokens ?? 0,
            cachedTokens: usageAny.cachedTokens,
            reasoningTokens: usageAny.reasoningTokens,
          };

          // Track cost (also emits usage event)
          await this.costTracker.track({
            model: model.alias,
            role: options.role,
            variant: options.variant,
            ...tokenUsage,
            latencyMs,
          });

          // Emit complete event
          this.emitCompleteEvent(requestId, model, options, latencyMs, tokenUsage);
        },
      });

      return result;
    } catch (error) {
      // Emit error event
      this.emitErrorEvent(requestId, model, error as Error, false);
      throw error;
    }
  }

  async generateText(options: TextOptions): Promise<Awaited<ReturnType<typeof generateText>>> {
    const { model, providerOptions, messages } = await this.resolveRequest(options);
    const requestId = generateRequestId();
    const startTime = Date.now();

    // Emit start event
    this.emitStartEvent(requestId, model, options);

    try {
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
      const latencyMs = Date.now() - startTime;
      const tokenUsage = {
        inputTokens: usageAny.promptTokens ?? usageAny.inputTokens ?? 0,
        outputTokens: usageAny.completionTokens ?? usageAny.outputTokens ?? 0,
        cachedTokens: usageAny.cachedTokens,
        reasoningTokens: usageAny.reasoningTokens,
      };

      // Track cost (also emits usage event)
      await this.costTracker.track({
        model: model.alias,
        role: options.role,
        variant: options.variant,
        ...tokenUsage,
        latencyMs,
      });

      // Emit complete event
      this.emitCompleteEvent(requestId, model, options, latencyMs, tokenUsage);

      return result;
    } catch (error) {
      // Emit error event
      this.emitErrorEvent(requestId, model, error as Error, false);
      throw error;
    }
  }

  async embed(options: EmbedOptions): Promise<{ embedding: number[]; embeddings: number[][] }> {
    const modelAlias = this.resolveModelAlias(options);
    const config = this.registry.getModelConfig(modelAlias);

    // Use Voyage native SDK for Voyage models
    if (config.provider === 'voyage') {
      if (!isVoyageAvailable()) {
        throw SilkboardError.apiKeyMissing('voyage', 'VOYAGE_API_KEY');
      }
      
      const values = Array.isArray(options.value) ? options.value : [options.value];
      const embeddings = await voyageEmbed(values, config);
      
      return {
        embedding: embeddings[0],
        embeddings,
      };
    }

    // Use AI SDK for other providers
    const { instance } = await this.registry.getEmbeddingModel(modelAlias);

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

  async rerank(options: RerankOptions): Promise<RerankResult[]> {
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
          throw SilkboardError.apiKeyMissing('voyage', 'VOYAGE_API_KEY');
        }
        return await voyageRerank(options.query, validDocs, config, options.topN);
      }

      if (config.provider === 'cohere') {
        if (!isCohereAvailable()) {
          throw SilkboardError.apiKeyMissing('cohere', 'COHERE_API_KEY');
        }
        return await cohereRerank(options.query, validDocs, config, options.topN);
      }

      throw SilkboardError.requestFailed(`Reranking not supported for provider: ${config.provider}`, new Error('Unsupported provider'));
    } catch (error) {
      // Try fallback if configured
      const fallbackAlias = this.getRoleFallback(options.role);
      if (fallbackAlias) {
        console.warn(
          `[Silkboard] Reranking failed with ${modelAlias}, trying fallback ${fallbackAlias}`
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

  private async resolveRequest(options: TextOptions) {
    const modelAlias = this.resolveModelAlias(options);
    const overrides = this.resolveOverrides(options);

    const model = await this.registry.getLanguageModel(modelAlias, overrides?.reasoning);

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
        throw SilkboardError.configNotLoaded('roles');
      }

      const resolved = this.configLoader.resolveRole(options.role, options.variant);
      return resolved.modelAlias;
    }

    throw SilkboardError.requestInvalid('Either model or role must be specified');
  }

  private resolveOverrides(options: TextOptions): {
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
  on<K extends keyof SilkboardEvent>(
    event: K,
    handler: SilkboardEventHandler<K>
  ): void {
    this.eventEmitter.on(event, handler);
  }

  off<K extends keyof SilkboardEvent>(
    event: K,
    handler: SilkboardEventHandler<K>
  ): void {
    this.eventEmitter.off(event, handler);
  }

  // Private event emission helpers
  private emitStartEvent(
    requestId: string,
    model: ResolvedModel,
    options: TextOptions
  ): void {
    this.eventEmitter.emit('start', {
      requestId,
      model: model.alias,
      provider: model.config.provider,
      role: options.role,
      variant: options.variant,
      timestamp: new Date(),
    });
  }

  private emitCompleteEvent(
    requestId: string,
    model: ResolvedModel,
    options: TextOptions,
    latencyMs: number,
    usage: {
      inputTokens: number;
      outputTokens: number;
      cachedTokens?: number;
      reasoningTokens?: number;
    }
  ): void {
    this.eventEmitter.emit('complete', {
      requestId,
      model: model.alias,
      provider: model.config.provider,
      role: options.role,
      variant: options.variant,
      latencyMs,
      usage,
      timestamp: new Date(),
    });
  }

  private emitErrorEvent(
    requestId: string,
    model: ResolvedModel,
    error: Error,
    willRetry: boolean,
    retryAttempt?: number
  ): void {
    this.eventEmitter.emit('error', {
      requestId,
      model: model.alias,
      provider: model.config.provider,
      error,
      willRetry,
      retryAttempt,
      timestamp: new Date(),
    });
  }

  // Utility methods
  listModels(type?: 'language' | 'embedding' | 'reranker'): string[] {
    return this.registry.listModels(type);
  }

  getModelConfig(alias: string) {
    return this.registry.getModelConfig(alias);
  }

  // For advanced use cases - get the underlying model instance
  async getLanguageModel(alias: string, overrides?: ReasoningOverride) {
    return await this.registry.getLanguageModel(alias, overrides);
  }

  async getEmbeddingModel(alias: string) {
    return await this.registry.getEmbeddingModel(alias);
  }
}

export function createSilkboard(config: SilkboardConfig): Silkboard {
  return new Silkboard(config);
}
