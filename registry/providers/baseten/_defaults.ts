/**
 * baseten Provider Defaults
 * 
 * Common capabilities, features, and usage tiers shared across all baseten models.
 * Individual models can override these by specifying their own values.
 */

import type { ModelCapabilities, ModelFeatures, RateLimits } from '../../types';

/** Default capabilities for baseten models */
export const defaultCapabilities: Partial<ModelCapabilities> = {
  streaming: true,
  functionCalling: true,
  parallelToolCalls: true, // TODO: Verify maximum concurrent tool calls
  structuredOutput: true,
  jsonMode: true,
  systemPrompt: true,
};

/** Default features for baseten models */
export const defaultFeatures: Partial<ModelFeatures> = {
  // TODO: Add shared features if Baseten exposes provider-wide capabilities
};

/** Usage tiers (rate limits) for baseten */
export const usageTiers: Record<string, RateLimits> = {
  basic_unverified: {
    rpm: 15,
    tpm: 100_000,
  },
  basic_verified: {
    rpm: 120,
    tpm: 500_000,
  },
  pro: {
    rpm: 120,
    tpm: 1_000_000,
  },
  enterprise: {
    rpm: 0, // UNAVAILABLE: Custom enterprise limits negotiated per customer
    tpm: 0, // UNAVAILABLE: Custom enterprise limits negotiated per customer
  },
};

/** Helper to create a baseten model with defaults */
export function withBasetenDefaults<T extends object>(model: T): T & {
  capabilities: ModelCapabilities;
  features: ModelFeatures;
} {
  return {
    ...model,
    capabilities: { ...defaultCapabilities, ...(model as any).capabilities },
    features: { ...defaultFeatures, ...(model as any).features },
  } as any;
}
