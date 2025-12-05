/**
 * cerebras Provider Defaults
 * 
 * Common capabilities, features, and usage tiers shared across all cerebras models.
 * Individual models can override these by specifying their own values.
 */

import type { ModelCapabilities, ModelFeatures, RateLimits } from '../../types';

/** Default capabilities for cerebras models */
export const defaultCapabilities: Partial<ModelCapabilities> = {
  streaming: true, // Supported via `stream` flag on chat completions
  systemPrompt: true, // System messages supported via `messages` array
  functionCalling: true, // Supported via `tools` and `tool_choice` (tool use)
  parallelToolCalls: true, // Controlled via `parallel_tool_calls` (default true)
  structuredOutput: true, // Supported via `response_format` + JSON schema
  jsonMode: true, // `{ type: "json_object" }` legacy JSON mode
  logprobs: true, // `logprobs` and `top_logprobs` request params
  seed: true, // `seed` parameter for best-effort determinism
  stopSequences: true, // `stop` parameter
};

/** Default features for cerebras models */
export const defaultFeatures: Partial<ModelFeatures> = {
  predictedOutputs: true, // Documented Predicted Outputs capability (see /capabilities/predicted-outputs)
  nativeToolUse: true, // Tool calling built into chat completions
};

/** Usage tiers (rate limits) for cerebras */
export const usageTiers: Record<string, RateLimits> = {
  free: {
    rpm: 30,
    tpm: 60_000,
    tpd: 1_000_000,
    // Default free-tier limits for most models on Cerebras (see Rate Limits page).
  },
  developer: {
    rpm: 1_000,
    tpm: 1_000_000,
    // Developer tier defaults used by most models (Rate Limits / per-model tables).
  },
  // GLM 4.6 has stricter per-model limits; expose them explicitly for callers
  // that want to reason about worst-case constraints at the provider level.
  'glm-free': {
    rpm: 10,
    tpm: 150_000,
    tpd: 1_000_000,
  },
  'glm-developer': {
    rpm: 250,
    tpm: 250_000,
  },
};

/** Helper to create a cerebras model with defaults */
export function withCerebrasDefaults<T extends object>(model: T): T & {
  capabilities: ModelCapabilities;
  features: ModelFeatures;
} {
  return {
    ...model,
    capabilities: { ...defaultCapabilities, ...(model as any).capabilities },
    features: { ...defaultFeatures, ...(model as any).features },
  } as any;
}
