/**
 * xai Provider Defaults
 * 
 * Common capabilities, features, and usage tiers shared across all xai models.
 * Individual models can override these by specifying their own values.
 */

import type { ModelCapabilities, ModelFeatures, RateLimits } from '../../types';

/** Default capabilities for xai models */
export const defaultCapabilities: Partial<ModelCapabilities> = {
  streaming: true,
  functionCalling: true,
  parallelToolCalls: true,
  structuredOutput: true,
  systemPrompt: true
};

/** Default features for xai models */
export const defaultFeatures: Partial<ModelFeatures> = {
  webSearch: true,
  promptCaching: true
};

/** Usage tiers (rate limits) for xai */
export const usageTiers: Record<string, RateLimits> = {
  // TODO: Add provider-specific usage tiers
  // Example:
  // free: { rpm: 60, tpm: 40_000 },
  // tier1: { rpm: 500, tpm: 200_000 },
};

/** Helper to create a xai model with defaults */
export function withXaiDefaults<T extends object>(model: T): T & {
  capabilities: ModelCapabilities;
  features: ModelFeatures;
} {
  return {
    ...model,
    capabilities: { ...defaultCapabilities, ...(model as any).capabilities },
    features: { ...defaultFeatures, ...(model as any).features },
  } as any;
}
