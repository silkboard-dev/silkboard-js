/**
 * alibaba Provider Defaults
 * 
 * Common capabilities, features, and usage tiers shared across all alibaba models.
 * Individual models can override these by specifying their own values.
 */

import type { ModelCapabilities, ModelFeatures, RateLimits } from '../../types';

/** Default capabilities for alibaba models */
export const defaultCapabilities: Partial<ModelCapabilities> = {
  streaming: true,
  functionCalling: true,
  structuredOutput: true,
  jsonMode: true,
  systemPrompt: true,
};

/** Default features for alibaba models */
export const defaultFeatures: Partial<ModelFeatures> = {
  // Many Qwen models support batch interfaces compatible with OpenAI
  batchApi: true,
  // Qwen3 and several flagship models support context cache / prompt caching
  contextCaching: true,
  // Realtime APIs are available for Omni, TTS, ASR and LiveTranslate
  realtimeApi: true,
};

/** Usage tiers (rate limits) for alibaba */
export const usageTiers: Record<string, RateLimits> = {
  // Based on typical limits for qwen3-max/qwen-plus in the Singapore region
  standard: {
    rpm: 600,
    tpm: 1_000_000,
  },
  // Based on higher-throughput models such as qwen3-coder-plus and qwen-flash
  highThroughput: {
    rpm: 2_400,
    tpm: 5_000_000,
  },
};

/** Helper to create a alibaba model with defaults */
export function withAlibabaDefaults<T extends object>(model: T): T & {
  capabilities: ModelCapabilities;
  features: ModelFeatures;
} {
  return {
    ...model,
    capabilities: { ...defaultCapabilities, ...(model as any).capabilities },
    features: { ...defaultFeatures, ...(model as any).features },
  } as any;
}
