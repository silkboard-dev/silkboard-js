/**
 * together Provider Defaults
 * 
 * Common capabilities, features, and usage tiers shared across all together models.
 * Individual models can override these by specifying their own values.
 */

import type { ModelCapabilities, ModelFeatures, RateLimits } from '../../types';

/** Default capabilities for together models */
export const defaultCapabilities: Partial<ModelCapabilities> = {
  streaming: true,
  systemPrompt: true,
  functionCalling: true
};

/** Default features for together models */
export const defaultFeatures: Partial<ModelFeatures> = {
  // No common features detected
};

/** Usage tiers (rate limits) for together */
export const usageTiers: Record<string, RateLimits> = {
  // TODO: Add provider-specific usage tiers
  // Example:
  // free: { rpm: 60, tpm: 40_000 },
  // tier1: { rpm: 500, tpm: 200_000 },
};

/** Helper to create a together model with defaults */
export function withTogetherDefaults<T extends object>(model: T): T & {
  capabilities: ModelCapabilities;
  features: ModelFeatures;
} {
  return {
    ...model,
    capabilities: { ...defaultCapabilities, ...(model as any).capabilities },
    features: { ...defaultFeatures, ...(model as any).features },
  } as any;
}
