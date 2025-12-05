/**
 * Base helpers for defining models and providers.
 * 
 * These helper functions provide type checking and can be extended
 * to add validation, defaults, or computed properties.
 */

import type { ModelDefinition, ProviderDefinition, ModelPricing, TokenPricing, PricingTier } from '../types';

/**
 * Define a model with type checking.
 * This is the primary way to create model definitions.
 */
export function defineModel<T extends ModelDefinition>(model: T): T {
  return model;
}

/**
 * Define a provider with type checking.
 */
export function defineProvider<T extends Omit<ProviderDefinition, 'models'> & { models: Record<string, ModelDefinition> }>(
  provider: T
): ProviderDefinition {
  return provider as ProviderDefinition;
}

/**
 * Get pricing for a specific tier.
 */
export function getPricingForTier(pricing: ModelPricing, tier: PricingTier = 'standard'): TokenPricing {
  switch (tier) {
    case 'batch':
      return pricing.batch ?? pricing.standard;
    case 'priority':
      return pricing.priority ?? pricing.standard;
    case 'flex':
      return pricing.flex ?? pricing.standard;
    default:
      return pricing.standard;
  }
}

/**
 * Get pricing for a specific context length (for tiered pricing).
 */
export function getPricingForContext(pricing: ModelPricing, tokenCount: number): TokenPricing {
  if (!pricing.contextTiers || pricing.contextTiers.length === 0) {
    return pricing.standard;
  }

  for (const tier of pricing.contextTiers) {
    if (tier.upTo === 'unlimited' || tokenCount <= tier.upTo) {
      return tier.pricing;
    }
  }

  return pricing.standard;
}

/**
 * Create a model variant by extending a base model.
 * Useful for creating dated snapshots or regional variants.
 */
export function extendModel<T extends ModelDefinition>(
  base: T,
  overrides: Partial<T> & { id: string }
): T {
  return {
    ...base,
    ...overrides,
  } as T;
}
