/**
 * TypeScript Registry Loader
 * 
 * Loads providers from the TypeScript registry (registry/providers/).
 * This replaces the YAML loader with compile-time type safety.
 * 
 * @example
 * ```typescript
 * import { providers, getProvider } from './ts-loader';
 * 
 * // Get all providers
 * console.log(Object.keys(providers));
 * 
 * // Get a specific provider
 * const openai = getProvider('openai');
 * console.log(openai?.models['gpt-4o'].pricing.standard.input);
 * ```
 */

// Import all providers from the registry
import { providers, providerIds, getProvider as getProviderFromRegistry } from '../../registry/providers';

// Re-export types from the registry
export type { 
  ModelDefinition, 
  ProviderDefinition,
  ModelPricing,
  TokenPricing,
  PricingTier,
  ModelCapabilities,
  ModelFeatures,
  Modalities,
  ContextWindow,
  ReasoningConfig,
  CachingConfig,
} from '../../registry/types';

// Re-export base helpers
export { defineModel, defineProvider, getPricingForTier, getPricingForContext } from '../../registry/base';

/**
 * All registered providers.
 */
export { providers };

/**
 * List of all provider IDs.
 */
export { providerIds };

/**
 * Get a provider by ID.
 */
export const getProvider = getProviderFromRegistry;

/**
 * Get a model by provider and model ID.
 */
export function getModel(providerId: string, modelId: string) {
  const provider = getProvider(providerId);
  return provider?.models[modelId];
}

/**
 * Get a model by full ID (provider/model format).
 */
export function getModelByFullId(fullId: string) {
  const [providerId, modelId] = fullId.split('/');
  if (!providerId || !modelId) return undefined;
  return getModel(providerId, modelId);
}

/**
 * List all model IDs across all providers.
 */
export function listAllModels(): string[] {
  const models: string[] = [];
  for (const [providerId, provider] of Object.entries(providers)) {
    for (const modelId of Object.keys(provider.models)) {
      models.push(`${providerId}/${modelId}`);
    }
  }
  return models;
}

/**
 * Find models by a predicate function.
 */
export function findModels(
  predicate: (model: any, modelId: string, providerId: string) => boolean
): Array<{ providerId: string; modelId: string; model: any }> {
  const results: Array<{ providerId: string; modelId: string; model: any }> = [];
  
  for (const [providerId, provider] of Object.entries(providers)) {
    for (const [modelId, model] of Object.entries(provider.models)) {
      if (predicate(model, modelId, providerId)) {
        results.push({ providerId, modelId, model });
      }
    }
  }
  
  return results;
}

/**
 * Find models that support a specific capability.
 */
export function findModelsByCapability(capability: string) {
  return findModels((model) => model.capabilities?.[capability] === true);
}

/**
 * Find models that support a specific feature.
 */
export function findModelsByFeature(feature: string) {
  return findModels((model) => model.features?.[feature] === true);
}

/**
 * Find models by type.
 */
export function findModelsByType(type: string) {
  return findModels((model) => model.type === type);
}
