/**
 * DeepSeek Reasoner (Thinking)
 *
 * DeepSeek V3.2 in thinking mode with extended chain-of-thought capabilities.
 * Supports JSON output, tool calls, and chat prefix completion.
 * Does NOT support FIM completion.
 *
 * @see {@link https://api-docs.deepseek.com/quick_start/pricing}
 * @see {@link https://api-docs.deepseek.com/guides/thinking_mode}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withDeepseekDefaults } from '../_defaults';

const deepseek_reasoner: ModelDefinition = withDeepseekDefaults(defineModel({
  id: 'deepseek-reasoner',
  name: 'DeepSeek Reasoner',
  type: 'chat',
  family: 'deepseek-v3',
  status: 'ga',
  releaseDate: '2025-12-01',
  description: 'DeepSeek V3.2 in thinking mode with extended chain-of-thought capabilities for complex problem solving',
  aliases: ['deepseek-r1'],
  contextWindow: {
    input: 128_000,
    output: 64_000, // Default 32K, Maximum 64K
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
  reasoning: {
    supported: true,
    type: 'native',
    defaultEnabled: true,
    budgetTokens: {
      min: 1,
      max: 64_000, // Matches max output tokens
      default: 32_000, // Default output tokens
    },
  },
  caching: {
    supported: true,
    type: 'automatic',
    ttlSeconds: 3600, // UNAVAILABLE: TTL not documented, using reasonable default for session-based caching
    discountPercent: 90, // Cache hit is 10% of cache miss price
  },
}));

export default deepseek_reasoner;
