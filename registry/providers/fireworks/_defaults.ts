/**
 * fireworks Provider Defaults
 *
 * Common capabilities, features, and usage tiers shared across all fireworks models.
 * Individual models can override these by specifying their own values.
 */

import type { ModelCapabilities, ModelFeatures, RateLimits } from '../../types';

/**
 * Default capabilities for fireworks models
 *
 * Fireworks exposes an OpenAI-compatible API for chat, completions, embeddings,
 * rerank, image, audio and vision models. Most serverless and on‑demand models
 * support streaming, function calling, JSON / structured outputs, and system
 * prompts by default.
 *
 * @see https://docs.fireworks.ai/getting-started/quickstart
 * @see https://docs.fireworks.ai/guides/function-calling
 * @see https://docs.fireworks.ai/structured-responses/structured-response-formatting
 */
export const defaultCapabilities: Partial<ModelCapabilities> = {
  streaming: true,
  functionCalling: true,
  parallelToolCalls: true, // OpenAI-compatible tool calling with multiple tools
  structuredOutput: true, // JSON / json_schema response_format support
  jsonMode: true,
  systemPrompt: true,
  stopSequences: true,
  seed: true,
};

/**
 * Default features for fireworks models
 *
 * Fireworks provides prompt caching, batch inference, fine‑tuning and
 * on‑demand deployments across most model families.
 *
 * @see https://docs.fireworks.ai/guides/prompt-caching
 * @see https://docs.fireworks.ai/guides/batch-inference
 * @see https://docs.fireworks.ai/fine-tuning/finetuning-intro
 */
export const defaultFeatures: Partial<ModelFeatures> = {
  promptCaching: true,
  batchApi: true,
  fineTuning: true,
  tuning: true,
  nativeToolUse: true,
};

/**
 * Usage tiers (rate limits) for fireworks
 *
 * Fireworks documents account‑level rate limits in terms of RPM and spend tiers.
 * Without a payment method accounts are limited to 10 RPM; adding a payment
 * method unlocks higher limits up to 6,000 RPM. Token‑per‑minute limits are
 * not published and are estimated here based on common industry defaults.
 *
 * @see https://docs.fireworks.ai/getting-started/quickstart
 * @see https://docs.fireworks.ai/guides/quotas_usage/rate-limits
 */
export const usageTiers: Record<string, RateLimits> = {
  no_payment: {
    rpm: 10,
    tpm: 40_000, // UNAVAILABLE: Fireworks does not publish TPM for free tier; placeholder based on common defaults
  },
  paid: {
    rpm: 6_000,
    tpm: 400_000, // UNAVAILABLE: Fireworks does not publish TPM for paid tiers; estimated placeholder
  },
};

/** Helper to create a fireworks model with defaults */
export function withFireworksDefaults<T extends object>(model: T): T & {
  capabilities: ModelCapabilities;
  features: ModelFeatures;
} {
  return {
    ...model,
    capabilities: { ...defaultCapabilities, ...(model as any).capabilities },
    features: { ...defaultFeatures, ...(model as any).features },
  } as any;
}
