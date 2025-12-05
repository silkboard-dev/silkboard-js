/**
 * groq Provider Defaults
 *
 * Common capabilities, features, and usage tiers shared across all groq models.
 * Individual models can override these by specifying their own values.
 */

import type { ModelCapabilities, ModelFeatures, RateLimits } from '../../types';

/** Default capabilities for groq models */
export const defaultCapabilities: Partial<ModelCapabilities> = {
  streaming: true,
  systemPrompt: true,
  functionCalling: true,
  parallelToolCalls: true,
  structuredOutput: true,
  jsonMode: true,
  stopSequences: true,
};

/** Default features for groq models */
export const defaultFeatures: Partial<ModelFeatures> = {
  promptCaching: true, // TODO: Verify prompt caching support per model/tier
  batchApi: true, // TODO: Confirm Batch API availability across plans
  nativeToolUse: true, // TODO: Confirm coverage for Groq Compound and built-in tools
};

/**
 * Usage tiers (rate limits) for groq.
 *
 * NOTE: Groq documents rate limits per-model and per-plan. Exact limits for an
 * organization must be read from the console. The values below are conservative
 * approximations based on the public Rate Limits docs and should be treated as
 * defaults only.
 */
export const usageTiers: Record<string, RateLimits> = {
  free: {
    rpm: 30,
    rpd: 7_000,
    tpm: 6_000,
    tpd: 500_000,
    // UNAVAILABLE: Exact free tier limits are not published in aggregate.
    // Approximated from examples in https://console.groq.com/docs/rate-limits.
  },
  developer: {
    rpm: 60,
    tpm: 70_000,
    // UNAVAILABLE: Developer limits are model-specific; these are typical base values
    // derived from the Rate Limits documentation for common models/systems.
  },
};

/** Helper to create a groq model with defaults */
export function withGroqDefaults<T extends object>(model: T): T & {
  capabilities: ModelCapabilities;
  features: ModelFeatures;
} {
  return {
    ...model,
    capabilities: { ...defaultCapabilities, ...(model as any).capabilities },
    features: { ...defaultFeatures, ...(model as any).features },
  } as any;
}
