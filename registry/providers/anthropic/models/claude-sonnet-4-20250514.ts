/**
 * Claude Sonnet 4
 * 
 * Claude Sonnet 4 with extended thinking.
 * 
 * @see {@link https://platform.anthropic.com/docs}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withAnthropicDefaults } from '../_defaults';

const claude_sonnet_4_20250514: ModelDefinition = withAnthropicDefaults(defineModel({
  id: 'claude-sonnet-4-20250514',
  name: 'Claude Sonnet 4',
  type: 'chat',
  family: 'claude-4',
  status: 'ga',
  description: 'Claude Sonnet 4 with extended thinking.',
  aliases: ['claude-4-sonnet'],
  releaseDate: '2025-05-14',
  contextWindow: {
    input: 200_000,
    output: 64_000,
  },
  modalities: {
    input: {
      text: true,
      image: true,
      file: true,
    },
    output: {
      text: true,
    },
  },
  pricing: {
    standard: {
      input: 3,
      output: 15,
      cachedInput: 0.3,
    },
    promptCaching: {
      write: 3.75,
      read: 0.3,
      ttlSeconds: 300,
    },
  },
  capabilities: {
    streaming: true,
    functionCalling: true,
    parallelToolCalls: true,
    structuredOutput: true,
    systemPrompt: true,
    stopSequences: true,
  },
  features: {
    computerUse: true,
    mcp: true,
    promptCaching: true,
    batchApi: true,
  },
  reasoning: {
    supported: true,
    type: 'extended_thinking',
    budgetTokens: {
      min: 1024,
      max: 128_000,
      default: 16_000,
    },
  },
  caching: {
    supported: true,
    type: 'explicit',
    minTokens: 1024,
    ttlSeconds: 300,
    discountPercent: 90,
  },
}));

export default claude_sonnet_4_20250514;
