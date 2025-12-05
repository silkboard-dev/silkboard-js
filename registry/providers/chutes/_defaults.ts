/**
 * chutes Provider Defaults
 *
 * Common capabilities, features, and usage tiers shared across all chutes models.
 * Individual models can override these by specifying their own values.
 */

import type { ModelCapabilities, ModelFeatures, RateLimits } from '../../types';

/** Default capabilities for chutes models */
export const defaultCapabilities: Partial<ModelCapabilities> = {
  streaming: true,
  systemPrompt: true,
  functionCalling: true, // TODO: Verify tool/function calling support across all llm.chutes.ai models
  structuredOutput: true, // Based on llm.chutes.ai supported_features: structured_outputs
  jsonMode: true, // Based on llm.chutes.ai supported_features: json_mode
  seed: true, // Based on supported_sampling_parameters including "seed"
  stopSequences: true, // Based on supported_sampling_parameters including "stop"
};

/** Default features for chutes models */
export const defaultFeatures: Partial<ModelFeatures> = {
  // TODO: Verify shared higher-level features such as batch API, prompt caching, or realtime APIs
};

/**
 * Usage tiers (rate limits) for chutes
 *
 * Chutes publishes daily request quotas per subscription plan rather than per‑minute limits.
 * The rpm values below are approximate conversions from the documented daily request caps.
 */
export const usageTiers: Record<string, RateLimits> = {
  legacyFree: {
    rpm: 0.14, // ~200 requests/day (200 / 1440) for legacy deposit-based users
  },
  base: {
    rpm: 0.21, // ~300 requests/day (Base plan) – see https://chutes.ai/pricing
  },
  plus: {
    rpm: 1.39, // ~2000 requests/day (Plus plan)
  },
  pro: {
    rpm: 3.47, // ~5000 requests/day (Pro plan)
  },
  enterprise: {
    rpm: 0, // UNAVAILABLE: Enterprise limits are custom/negotiated; 0 here means "no published cap"
  },
};

/** Helper to create a chutes model with defaults */
export function withChutesDefaults<T extends object>(model: T): T & {
  capabilities: ModelCapabilities;
  features: ModelFeatures;
} {
  return {
    ...model,
    capabilities: { ...defaultCapabilities, ...((model as any).capabilities ?? {}) },
    features: { ...defaultFeatures, ...((model as any).features ?? {}) },
  } as any;
}
