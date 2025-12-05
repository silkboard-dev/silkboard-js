/**
 * cloudflare Provider Defaults
 * 
 * Common capabilities, features, and usage tiers shared across all cloudflare models.
 * Individual models can override these by specifying their own values.
 */

import type { ModelCapabilities, ModelFeatures, RateLimits } from '../../types';

/** Default capabilities for cloudflare models */
export const defaultCapabilities: Partial<ModelCapabilities> = {
  streaming: true,
  functionCalling: true, // TODO: Verify per-model support; Workers AI docs list function calling for select LLMs
  systemPrompt: true,
};

/** Default features for cloudflare models */
export const defaultFeatures: Partial<ModelFeatures> = {
  batchApi: true, // TODO: Confirm model-level availability; Workers AI exposes batch execution in catalog
};

/** Usage tiers (rate limits) for cloudflare */
export const usageTiers: Record<string, RateLimits> = {
  // Source: https://developers.cloudflare.com/workers-ai/platform/limits/ (task-type limits; TPM not published)
  text_generation: {
    rpm: 1500, // UNAVAILABLE: Provider does not publish TPM; placeholder
    tpm: 0, // TODO: Replace when official TPM limits are documented
  },
  text_embeddings: {
    rpm: 3000,
    tpm: 0, // TODO: Replace when official TPM limits are documented
  },
  automatic_speech_recognition: {
    rpm: 720,
    tpm: 0, // TODO: Replace when official TPM limits are documented
  },
};

/** Helper to create a cloudflare model with defaults */
export function withCloudflareDefaults<T extends object>(model: T): T & {
  capabilities: ModelCapabilities;
  features: ModelFeatures;
} {
  return {
    ...model,
    capabilities: { ...defaultCapabilities, ...(model as any).capabilities },
    features: { ...defaultFeatures, ...(model as any).features },
  } as any;
}
