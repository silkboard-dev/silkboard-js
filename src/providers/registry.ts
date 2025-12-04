import {
  customProvider,
  wrapLanguageModel,
  defaultSettingsMiddleware,
} from 'ai';
import type { LanguageModel } from 'ai';
import type {
  ModelsConfigFile,
  ModelConfig,
  ReasoningOverride,
  ResolvedModel,
  ResolvedEmbeddingModel,
} from '../types';
import { getProvider } from './factory';
import { buildReasoningConfig } from '../reasoning';
import { SilkboardError } from '../errors';

type EmbeddingModelType = ReturnType<any['textEmbeddingModel']>;

export class Registry {
  private modelsConfig: ModelsConfigFile;
  private languageModelCache = new Map<string, LanguageModel>();
  private embeddingModelCache = new Map<string, EmbeddingModelType>();

  constructor(config: ModelsConfigFile) {
    this.modelsConfig = config;
  }

  async getLanguageModel(
    alias: string,
    overrides?: ReasoningOverride
  ): Promise<ResolvedModel> {
    const config = this.modelsConfig.models[alias];
    if (!config) {
      throw SilkboardError.modelNotFound(alias);
    }

    if (config.type !== 'language') {
      throw SilkboardError.modelTypeMismatch(alias, 'language', config.type);
    }

    // Build reasoning configuration
    const { providerOptions, extraBody } = buildReasoningConfig(config, overrides);

    // Get or create the base model instance
    const cacheKey = `${alias}:${JSON.stringify(overrides ?? {})}`;
    let instance = this.languageModelCache.get(cacheKey);

    if (!instance) {
      instance = await this.createLanguageModel(config, providerOptions, extraBody);
      this.languageModelCache.set(cacheKey, instance);
    }

    return {
      alias,
      config,
      instance,
      providerOptions,
      extraBody,
    };
  }

  async getEmbeddingModel(alias: string): Promise<ResolvedEmbeddingModel> {
    const config = this.modelsConfig.models[alias];
    if (!config) {
      throw SilkboardError.modelNotFound(alias);
    }

    if (config.type !== 'embedding') {
      throw SilkboardError.modelTypeMismatch(alias, 'embedding', config.type);
    }

    // Voyage uses native SDK
    if (config.provider === 'voyage') {
      throw SilkboardError.requestInvalid(
        'Voyage embedding models use native SDK. Use the VoyageAdapter instead.'
      );
    }

    let instance = this.embeddingModelCache.get(alias);

    if (!instance) {
      instance = await this.createEmbeddingModel(config);
      this.embeddingModelCache.set(alias, instance);
    }

    return {
      alias,
      config,
      instance,
    };
  }

  private async createLanguageModel(
    config: ModelConfig,
    providerOptions: Record<string, unknown>,
    extraBody?: Record<string, unknown>
  ): Promise<LanguageModel> {
    const provider = await getProvider(config.provider);

    if (!provider) {
      throw SilkboardError.providerNotAvailable(config.provider);
    }

    // Create base model with options for OpenRouter
    let baseModel: any;
    if (config.provider === 'openrouter' && extraBody) {
      baseModel = provider(config.model_id, { extraBody });
    } else {
      baseModel = provider(config.model_id);
    }

    // Wrap with default settings middleware
    const wrappedModel = wrapLanguageModel({
      model: baseModel,
      middleware: defaultSettingsMiddleware({
        settings: {
          temperature: config.parameters?.temperature,
          maxOutputTokens: config.parameters?.max_tokens,
          topP: config.parameters?.top_p,
          providerOptions: providerOptions as any,
        },
      }),
    });

    return wrappedModel;
  }

  private async createEmbeddingModel(config: ModelConfig): Promise<EmbeddingModelType> {
    const provider = await getProvider(config.provider);

    if (!provider) {
      throw SilkboardError.providerNotAvailable(config.provider);
    }

    // OpenAI embedding model
    if (config.provider === 'openai') {
      return provider.textEmbeddingModel(config.model_id);
    }

    // For other providers, try the embedding method
    if (typeof provider.embedding === 'function') {
      return provider.embedding(config.model_id);
    }

    if (typeof provider.textEmbeddingModel === 'function') {
      return provider.textEmbeddingModel(config.model_id);
    }

    throw SilkboardError.requestInvalid(
      `Provider '${config.provider}' does not support embedding models`
    );
  }

  async buildCustomProvider() {
    const languageModels: Record<string, LanguageModel> = {};

    for (const [alias, config] of Object.entries(this.modelsConfig.models)) {
      if (config.type === 'language') {
        try {
          const { instance } = await this.getLanguageModel(alias);
          languageModels[alias] = instance;
        } catch (error) {
          console.warn(
            `[Silkboard] Failed to create model '${alias}':`,
            (error as Error).message
          );
        }
      }
    }

    return customProvider({
      languageModels: languageModels as any,
      // No fallback - explicit model selection only
    });
  }

  getModelConfig(alias: string): ModelConfig {
    const config = this.modelsConfig.models[alias];
    if (!config) {
      throw SilkboardError.modelNotFound(alias);
    }
    return config;
  }

  listModels(type?: 'language' | 'embedding' | 'reranker'): string[] {
    return Object.entries(this.modelsConfig.models)
      .filter(([_, config]) => !type || config.type === type)
      .map(([alias]) => alias);
  }

  clearCache(): void {
    this.languageModelCache.clear();
    this.embeddingModelCache.clear();
  }
}

export function createRegistry(config: ModelsConfigFile): Registry {
  return new Registry(config);
}
