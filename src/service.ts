import { streamText, generateText, embed, embedMany } from 'ai';
import { ConfigLoader } from './loaders';
import { Registry } from './providers/registry';
import { CostTracker } from './cost/tracker';
import { addAnthropicCacheControl } from './caching/anthropic';
import { voyageEmbed, voyageRerank, isVoyageAvailable } from './providers/adapters/voyage';
import { cohereRerank, isCohereAvailable } from './providers/adapters/cohere';
import { SilkboardEventEmitter, generateRequestId } from './events';
import { Router } from './router';
import { ProviderRegistry } from './registry';
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
  RoutingConfig,
  RouterContext,
} from './types';
import { SilkboardError } from './errors';

export class Silkboard {
  private configLoader: ConfigLoader;
  private registry: Registry;
  private costTracker: CostTracker;
  private eventEmitter: SilkboardEventEmitter;
  private router: Router | null = null;
  private providerRegistry: ProviderRegistry | null = null;
  private emitStreamEvents: boolean;

  constructor(config: SilkboardConfig) {
    this.configLoader = new ConfigLoader(config.environment);
    this.eventEmitter = new SilkboardEventEmitter();
    this.emitStreamEvents = config.emitStreamEvents ?? false;

    // Load models config
    const modelsConfig = this.configLoader.loadModelsConfig(config.modelsConfig);

    // Load roles config if provided
    if (config.rolesConfig) {
      this.configLoader.loadRolesConfig(config.rolesConfig);
    }

    // Initialize provider registry if path provided
    if (config.registryPath) {
      this.providerRegistry = new ProviderRegistry({
        registryPath: config.registryPath,
        preload: true,
      });
    }

    // Initialize registry and cost tracker
    this.registry = new Registry(modelsConfig);
    this.costTracker = new CostTracker({
      modelConfigs: modelsConfig.models,
      pricingCachePath: config.pricingCache,
      eventEmitter: this.eventEmitter,
      registry: this.providerRegistry ?? undefined,
    });

    // Initialize router if routing config provided
    if (config.routingConfig) {
      const routingConfig = this.loadRoutingConfig(config.routingConfig);
      this.router = new Router({
        config: routingConfig,
        eventEmitter: this.eventEmitter,
        roleResolver: (role: string, variant?: string) => {
          const resolved = this.configLoader.resolveRole(role, variant);
          return resolved.modelAlias;
        },
      });
    }
  }

  private loadRoutingConfig(configPathOrObject: string | RoutingConfig): RoutingConfig {
    if (typeof configPathOrObject === 'string') {
      const { readFileSync, existsSync } = require('fs');
      const { parse: parseYaml } = require('yaml');
      
      if (!existsSync(configPathOrObject)) {
        throw SilkboardError.configNotFound(configPathOrObject);
      }
      const content = readFileSync(configPathOrObject, 'utf-8');
      const ext = configPathOrObject.toLowerCase().split('.').pop();
      
      if (ext === 'json') {
        return JSON.parse(content);
      }
      return parseYaml(content);
    }
    return configPathOrObject;
  }

  async streamText(options: TextOptions): Promise<ReturnType<typeof streamText>> {
    const { model, providerOptions, messages } = await this.resolveRequest(options);
    const requestId = generateRequestId();
    const startTime = Date.now();
    let chunkIndex = 0;

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
        onChunk: this.emitStreamEvents ? ({ chunk }) => {
          // Emit stream event for each text chunk
          if (chunk.type === 'text-delta') {
            this.eventEmitter.emit('stream', {
              requestId,
              model: model.alias,
              provider: model.config.provider,
              chunk: (chunk as any).text ?? (chunk as any).textDelta ?? '',
              chunkIndex: chunkIndex++,
              timestamp: new Date(),
            });
          }
        } : undefined,
        onFinish: async ({ usage }) => {
          const usageAny = usage as any;
          const latencyMs = Date.now() - startTime;
          const tokenUsage = {
            inputTokens: usageAny.promptTokens ?? usageAny.inputTokens ?? 0,
            outputTokens: usageAny.completionTokens ?? usageAny.outputTokens ?? 0,
            cachedTokens: usageAny.cachedTokens,
            reasoningTokens: usageAny.reasoningTokens,
          };

          // Record success for router health tracking
          this.router?.recordSuccess(model.alias, latencyMs);

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
      // Record failure for router health tracking
      this.router?.recordFailure(model.alias, error as Error);
      
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

      // Record success for router health tracking
      this.router?.recordSuccess(model.alias, latencyMs);

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
      // Record failure for router health tracking
      this.router?.recordFailure(model.alias, error as Error);
      
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

  private resolveModelAlias(options: { model?: string; role?: string; variant?: string; metadata?: Record<string, unknown> }): string {
    // If router is configured, use it for model selection
    if (this.router) {
      const context: RouterContext = {
        requestId: generateRequestId(),
        model: options.model,
        role: options.role,
        variant: options.variant,
        metadata: options.metadata,
      };
      const result = this.router.route(context);
      return result.model;
    }

    // Fallback to direct resolution
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

  // Cost estimation
  /**
   * Estimate cost before making a request.
   * Useful for budget checks and cost projections.
   */
  async estimateCost(params: {
    model: string;
    inputTokens: number;
    outputTokens?: number;
    cachedTokens?: number;
    reasoningTokens?: number;
  }): Promise<number> {
    return this.costTracker.estimateCost(params);
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

  // Router access
  /**
   * Get the router instance for advanced routing control.
   * Returns null if no routing config was provided.
   */
  getRouter(): Router | null {
    return this.router;
  }

  /**
   * Get the provider registry for metadata lookups.
   * Returns null if no registry path was provided.
   */
  getProviderRegistry(): ProviderRegistry | null {
    return this.providerRegistry;
  }
}

export function createSilkboard(config: SilkboardConfig): Silkboard {
  return new Silkboard(config);
}
