/**
 * Claude Opus 4.5
 * 
 * Most capable Claude model, excelling at complex reasoning and creative tasks.
 * 
 * @see {@link https://platform.anthropic.com/docs}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withAnthropicDefaults } from '../_defaults';

const claude_opus_4_5_20251101: ModelDefinition = withAnthropicDefaults(defineModel({
  id: 'claude-opus-4-5-20251101',
  name: 'Claude Opus 4.5',
  type: 'chat',
  family: 'claude-4.5',
  status: 'ga',
  description: 'Most capable Claude model, excelling at complex reasoning and creative tasks.',
  aliases: ['claude-4-5-opus', 'claude-opus-4-5'],
  releaseDate: '2025-11-01',
  contextWindow: {
    input: 200_000,
    output: 8192,
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
      input: 5,
      output: 25,
      cachedInput: 0.5,
    },
    promptCaching: {
      write: 6.25,
      read: 0.5,
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

export default claude_opus_4_5_20251101;
