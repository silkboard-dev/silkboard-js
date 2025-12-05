/**
 * moonshot Provider Defaults
 * 
 * Common capabilities, features, and usage tiers shared across all moonshot models.
 * Individual models can override these by specifying their own values.
 */

import type { ModelCapabilities, ModelFeatures, RateLimits } from '../../types';

/** Default capabilities for moonshot models */
export const defaultCapabilities: Partial<ModelCapabilities> = {
  functionCalling: true,
  streaming: true,
  systemPrompt: true
};

/** Default features for moonshot models */
export const defaultFeatures: Partial<ModelFeatures> = {
  // No common features detected
};

/** Usage tiers (rate limits) for moonshot */
export const usageTiers: Record<string, RateLimits> = {
  // TODO: Add provider-specific usage tiers
  // Example:
  // free: { rpm: 60, tpm: 40_000 },
  // tier1: { rpm: 500, tpm: 200_000 },
};

/** Helper to create a moonshot model with defaults */
export function withMoonshotDefaults<T extends object>(model: T): T & {
  capabilities: ModelCapabilities;
  features: ModelFeatures;
} {
  return {
    ...model,
    capabilities: { ...defaultCapabilities, ...(model as any).capabilities },
    features: { ...defaultFeatures, ...(model as any).features },
  } as any;
}
