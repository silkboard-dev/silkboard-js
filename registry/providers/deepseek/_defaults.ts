/**
 * DeepSeek Provider Defaults
 *
 * Common capabilities, features, and usage tiers shared across all DeepSeek models.
 * Individual models can override these by specifying their own values.
 *
 * @see {@link https://api-docs.deepseek.com/}
 */

import type { ModelCapabilities, ModelFeatures, RateLimits } from '../../types';

/** Default capabilities for DeepSeek models */
export const defaultCapabilities: Partial<ModelCapabilities> = {
  streaming: true,
  functionCalling: true,
  structuredOutput: true,
  jsonMode: true,
  systemPrompt: true,
  stopSequences: true,
};

/** Default features for DeepSeek models */
export const defaultFeatures: Partial<ModelFeatures> = {
  contextCaching: true,
  promptCaching: true,
};

/**
 * Usage tiers (rate limits) for DeepSeek
 *
 * Note: DeepSeek API does NOT constrain user's rate limit.
 * They will try their best to serve every request.
 * Under high traffic, requests may be queued with keep-alive responses.
 * Connections timeout after 30 minutes if not completed.
 *
 * @see {@link https://api-docs.deepseek.com/quick_start/rate_limit}
 */
export const usageTiers: Record<string, RateLimits> = {
  default: {
    rpm: -1, // No rate limit (unlimited)
    tpm: -1, // No rate limit (unlimited)
  },
};

/** Helper to create a DeepSeek model with defaults */
export function withDeepseekDefaults<T extends object>(model: T): T & {
  capabilities: ModelCapabilities;
  features: ModelFeatures;
} {
  return {
    ...model,
    capabilities: { ...defaultCapabilities, ...(model as any).capabilities },
    features: { ...defaultFeatures, ...(model as any).features },
  } as any;
}
