/**
 * deepinfra Provider Defaults
 *
 * Common capabilities, features, and usage tiers shared across all deepinfra models.
 * Individual models can override these by specifying their own values.
 */

import type { ModelCapabilities, ModelFeatures, RateLimits } from '../../types';

/** Default capabilities for deepinfra models */
export const defaultCapabilities: Partial<ModelCapabilities> = {
  // DeepInfra exposes an OpenAI-compatible API with streaming, tools and JSON responses.
  streaming: true,
  functionCalling: true,
  structuredOutput: true,
  systemPrompt: true,
  logprobs: true,
  jsonMode: true,
};

/** Default features for deepinfra models */
export const defaultFeatures: Partial<ModelFeatures> = {
  // No provider-wide higher-level features (assistants, realtime, etc.) are documented.
};

/** Usage tiers (rate limits) for deepinfra */
export const usageTiers: Record<string, RateLimits> = {
  // DeepInfra documents a default limit of 200 concurrent requests per model,
  // but does not publish explicit RPM/TPM values. The RPM/TPM numbers below are
  // conservative estimates to satisfy registry requirements.
  default: {
    rpm: 1_200, // UNAVAILABLE: Derived from 200 concurrent requests at ~10s latency
    tpm: 300_000, // UNAVAILABLE: Provider does not publish token-based limits
    concurrent: 200,
  },
  tier1: {
    rpm: 1_200, // UNAVAILABLE: Same as default; tiers are billing-based, not rate-based
    tpm: 300_000, // UNAVAILABLE: No published token limits for tiers
    concurrent: 200,
  },
};

/** Helper to create a deepinfra model with defaults */
export function withDeepinfraDefaults<T extends object>(model: T): T & {
  capabilities: ModelCapabilities;
  features: ModelFeatures;
} {
  return {
    ...model,
    capabilities: { ...defaultCapabilities, ...(model as any).capabilities },
    features: { ...defaultFeatures, ...(model as any).features },
  } as any;
}
