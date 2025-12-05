/**
 * Provider Registry - manages provider metadata and model lookups.
 */

import type {
  ProviderMetadataFile,
  ProviderMetadata,
  ModelMetadata,
  ResolvedModel,
  RegistryLookupResult,
  RegistryPricing,
  ProviderCategory,
} from '../types/registry';
import { RegistryLoader } from './loader';

export interface RegistryOptions {
  /** Path to registry directory */
  registryPath: string;
  /** Whether to load all providers on init */
  preload?: boolean;
}

/**
 * Provider Registry - central access point for provider and model metadata.
 */
export class ProviderRegistry {
  private loader: RegistryLoader;
  private providers: Map<string, ProviderMetadataFile> = new Map();
  private modelIndex: Map<string, { providerId: string; modelId: string }> = new Map();
  private aliasIndex: Map<string, { providerId: string; modelId: string }> = new Map();
  private loaded = false;

  constructor(options: RegistryOptions) {
    this.loader = new RegistryLoader({ registryPath: options.registryPath });
    
    if (options.preload) {
      this.loadAll();
    }
  }

  /**
   * Load all provider metadata from the registry.
   */
  loadAll(): void {
    const result = this.loader.load();
    
    this.providers = result.providers;
    this.buildIndexes();
    this.loaded = true;

    if (result.errors.length > 0) {
      console.warn('[Registry] Errors loading providers:', result.errors);
    }
  }

  /**
   * Build model and alias indexes for fast lookups.
   */
  private buildIndexes(): void {
    this.modelIndex.clear();
    this.aliasIndex.clear();

    for (const [providerId, providerData] of this.providers) {
      // Skip providers without models
      if (!providerData.models) continue;
      
      for (const [modelId, modelData] of Object.entries(providerData.models)) {
        // Index by full model ID (provider/model)
        const fullId = `${providerId}/${modelId}`;
        this.modelIndex.set(fullId, { providerId, modelId });
        
        // Index by model ID alone (for direct lookups)
        this.modelIndex.set(modelId, { providerId, modelId });

        // Index aliases
        if (modelData.aliases) {
          for (const alias of modelData.aliases) {
            this.aliasIndex.set(alias, { providerId, modelId });
            // Also index with provider prefix
            this.aliasIndex.set(`${providerId}/${alias}`, { providerId, modelId });
          }
        }
      }
    }
  }

  /**
   * Ensure registry is loaded.
   */
  private ensureLoaded(): void {
    if (!this.loaded) {
      this.loadAll();
    }
  }

  /**
   * Get a provider by ID.
   */
  getProvider(providerId: string): ProviderMetadata | null {
    this.ensureLoaded();
    return this.providers.get(providerId)?.provider ?? null;
  }

  /**
   * Get full provider metadata file.
   */
  getProviderFile(providerId: string): ProviderMetadataFile | null {
    this.ensureLoaded();
    return this.providers.get(providerId) ?? null;
  }

  /**
   * Get a model by ID (supports aliases and provider/model format).
   */
  getModel(modelId: string): RegistryLookupResult | null {
    this.ensureLoaded();

    // Try direct model lookup
    let lookup = this.modelIndex.get(modelId);
    
    // Try alias lookup
    if (!lookup) {
      lookup = this.aliasIndex.get(modelId);
    }

    if (!lookup) {
      return null;
    }

    const providerData = this.providers.get(lookup.providerId);
    if (!providerData) {
      return null;
    }

    const modelData = providerData.models[lookup.modelId];
    if (!modelData) {
      return null;
    }

    return {
      provider: providerData.provider,
      model: modelData,
      defaults: providerData.defaults ?? {},
    };
  }

  /**
   * Get pricing for a model.
   */
  getPricing(modelId: string): RegistryPricing | null {
    const result = this.getModel(modelId);
    return result?.model.pricing ?? null;
  }

  /**
   * Get all models from a provider.
   */
  getProviderModels(providerId: string): Record<string, ModelMetadata> | null {
    this.ensureLoaded();
    return this.providers.get(providerId)?.models ?? null;
  }

  /**
   * List all provider IDs.
   */
  listProviders(): string[] {
    this.ensureLoaded();
    return Array.from(this.providers.keys());
  }

  /**
   * List all model IDs (including aliases).
   */
  listModels(): string[] {
    this.ensureLoaded();
    return Array.from(this.modelIndex.keys());
  }

  /**
   * List providers by category.
   */
  listProvidersByCategory(category: ProviderCategory): string[] {
    this.ensureLoaded();
    return Array.from(this.providers.entries())
      .filter(([_, data]) => data.provider.category === category)
      .map(([id]) => id);
  }

  /**
   * Search models by capability.
   */
  findModelsByCapability(capability: keyof ModelMetadata['capabilities']): ResolvedModel[] {
    this.ensureLoaded();
    const results: ResolvedModel[] = [];

    for (const [providerId, providerData] of this.providers) {
      if (!providerData.models) continue;
      for (const [modelId, modelData] of Object.entries(providerData.models)) {
        if (modelData.capabilities?.[capability]) {
          results.push({
            providerId,
            providerName: providerData.provider.name,
            providerCategory: providerData.provider.category,
            modelId,
            metadata: modelData,
            defaults: providerData.defaults ?? {},
          });
        }
      }
    }

    return results;
  }

  /**
   * Search models by feature.
   */
  findModelsByFeature(feature: keyof ModelMetadata['features']): ResolvedModel[] {
    this.ensureLoaded();
    const results: ResolvedModel[] = [];

    for (const [providerId, providerData] of this.providers) {
      if (!providerData.models) continue;
      for (const [modelId, modelData] of Object.entries(providerData.models)) {
        if (modelData.features?.[feature]) {
          results.push({
            providerId,
            providerName: providerData.provider.name,
            providerCategory: providerData.provider.category,
            modelId,
            metadata: modelData,
            defaults: providerData.defaults ?? {},
          });
        }
      }
    }

    return results;
  }

  /**
   * Search models by type.
   */
  findModelsByType(type: ModelMetadata['type']): ResolvedModel[] {
    this.ensureLoaded();
    const results: ResolvedModel[] = [];

    for (const [providerId, providerData] of this.providers) {
      if (!providerData.models) continue;
      for (const [modelId, modelData] of Object.entries(providerData.models)) {
        if (modelData.type === type) {
          results.push({
            providerId,
            providerName: providerData.provider.name,
            providerCategory: providerData.provider.category,
            modelId,
            metadata: modelData,
            defaults: providerData.defaults ?? {},
          });
        }
      }
    }

    return results;
  }

  /**
   * Check if a model supports a specific modality.
   */
  supportsModality(
    modelId: string, 
    direction: 'input' | 'output', 
    modality: 'text' | 'image' | 'audio' | 'video' | 'file' | 'embedding'
  ): boolean {
    const result = this.getModel(modelId);
    if (!result) return false;

    const modalities = result.model.modalities?.[direction];
    if (!modalities) return false;

    return modalities[modality as keyof typeof modalities] === true;
  }

  /**
   * Get rate limits for a model (optionally by tier).
   */
  getRateLimits(modelId: string, tier?: string): RegistryLookupResult['model']['rate_limits'] | null {
    const result = this.getModel(modelId);
    if (!result) return null;

    // If tier specified, look up provider tier limits
    if (tier) {
      const providerData = this.providers.get(result.provider.id);
      const tierLimits = providerData?.rate_limit_tiers?.[tier]?.limits;
      if (tierLimits) return tierLimits;
    }

    // Fall back to model-specific limits
    return result.model.rate_limits ?? null;
  }

  /**
   * Reload registry from disk.
   */
  reload(): void {
    this.loaded = false;
    this.loadAll();
  }
}

/**
 * Create a provider registry.
 */
export function createRegistry(registryPath: string, preload = true): ProviderRegistry {
  return new ProviderRegistry({ registryPath, preload });
}
