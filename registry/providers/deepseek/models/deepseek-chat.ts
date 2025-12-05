/**
 * DeepSeek V3.2 (Non-thinking)
 *
 * Latest DeepSeek chat model in non-thinking mode.
 * Supports JSON output, tool calls, chat prefix completion, and FIM completion.
 *
 * @see {@link https://api-docs.deepseek.com/quick_start/pricing}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withDeepseekDefaults } from '../_defaults';

const deepseek_chat: ModelDefinition = withDeepseekDefaults(defineModel({
  id: 'deepseek-chat',
  name: 'DeepSeek V3.2',
  type: 'chat',
  family: 'deepseek-v3',
  status: 'ga',
  releaseDate: '2025-12-01',
  description: 'DeepSeek V3.2 in non-thinking mode - general-purpose chat model with tool calling and JSON output support',
  aliases: ['deepseek-v3'],
  contextWindow: {
    input: 128_000,
    output: 8_000, // Default 4K, Maximum 8K
  },
  modalities: {
    input: {
      text: true,
    },
    output: {
      text: true,
    },
  },
  pricing: {
    standard: {
      input: 0.28, // $0.28 per 1M tokens (cache miss)
      output: 0.42, // $0.42 per 1M tokens
      cachedInput: 0.028, // $0.028 per 1M tokens (cache hit)
    },
  },
  capabilities: {
    streaming: true,
    functionCalling: true,
    parallelToolCalls: true,
    structuredOutput: true,
    jsonMode: true,
    systemPrompt: true,
    stopSequences: true,
  },
  features: {
    promptCaching: true,
    contextCaching: true,
  },
  caching: {
    supported: true,
    type: 'automatic',
    ttlSeconds: 3600, // UNAVAILABLE: TTL not documented, using reasonable default for session-based caching
    discountPercent: 90, // Cache hit is 10% of cache miss price
  },
}));

export default deepseek_chat;
