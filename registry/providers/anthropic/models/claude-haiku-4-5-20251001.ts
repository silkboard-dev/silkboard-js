/**
 * Claude Haiku 4.5
 * 
 * Fast and capable model, significantly smarter than Haiku 3.5.
 * 
 * @see {@link https://platform.anthropic.com/docs}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withAnthropicDefaults } from '../_defaults';

const claude_haiku_4_5_20251001: ModelDefinition = withAnthropicDefaults(defineModel({
  id: 'claude-haiku-4-5-20251001',
  name: 'Claude Haiku 4.5',
  type: 'chat',
  family: 'claude-4.5',
  status: 'ga',
  description: 'Fast and capable model, significantly smarter than Haiku 3.5.',
  aliases: ['claude-4-5-haiku'],
  releaseDate: '2025-10-01',
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
      input: 1,
      output: 5,
      cachedInput: 0.1,
    },
    promptCaching: {
      write: 1.25,
      read: 0.1,
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

export default claude_haiku_4_5_20251001;
