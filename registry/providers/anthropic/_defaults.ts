/**
 * anthropic Provider Defaults
 * 
 * Common capabilities, features, and usage tiers shared across all anthropic models.
 * Individual models can override these by specifying their own values.
 */

import type { ModelCapabilities, ModelFeatures, RateLimits } from '../../types';

/** Default capabilities for anthropic models */
export const defaultCapabilities: Partial<ModelCapabilities> = {
  streaming: true,
  functionCalling: true,
  parallelToolCalls: true,
  structuredOutput: true,
  systemPrompt: true,
  stopSequences: true,
  logprobs: false, // TODO: Verify availability; not documented as GA
};

/** Default features for anthropic models */
export const defaultFeatures: Partial<ModelFeatures> = {
  promptCaching: true,
  batchApi: true,
  computerUse: true, // TODO: Verify beta header requirements
  mcp: true,
  nativeToolUse: true,
};

/** Usage tiers (rate limits) for anthropic */
export const usageTiers: Record<string, RateLimits> = {
  tier1: {
    rpm: 50,
    tpm: 30_000, // UNAVAILABLE: Official TPM values not published; using commonly referenced Tier 1 defaults
  },
  tier2: {
    rpm: 1_000,
    tpm: 450_000, // UNAVAILABLE: Official TPM values not published; approximate based on public tier guidance
  },
  tier3: {
    rpm: 2_000,
    tpm: 800_000, // UNAVAILABLE: Official TPM values not published; approximate based on public tier guidance
  },
  tier4: {
    rpm: 4_000,
    tpm: 2_000_000, // UNAVAILABLE: Official TPM values not published; approximate based on public tier guidance
  },
};

/** Helper to create a anthropic model with defaults */
export function withAnthropicDefaults<T extends object>(model: T): T & {
  capabilities: ModelCapabilities;
  features: ModelFeatures;
} {
  return {
    ...model,
    capabilities: { ...defaultCapabilities, ...(model as any).capabilities },
    features: { ...defaultFeatures, ...(model as any).features },
  } as any;
}
