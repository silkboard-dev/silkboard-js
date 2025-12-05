/**
 * Claude Opus 4.1
 * 
 * Updated Opus model.
 * 
 * @see {@link https://platform.anthropic.com/docs}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withAnthropicDefaults } from '../_defaults';

const claude_opus_4_1_20250805: ModelDefinition = withAnthropicDefaults(defineModel({
  id: 'claude-opus-4-1-20250805',
  name: 'Claude Opus 4.1',
  type: 'chat',
  family: 'claude-4',
  status: 'ga',
  description: 'Updated Opus model.',
  aliases: ['claude-4-1-opus'],
  releaseDate: '2025-08-05',
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
      input: 15,
      output: 75,
      cachedInput: 1.5,
    },
    promptCaching: {
      write: 18.75,
      read: 1.5,
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
    mcp: true,
    promptCaching: true,
    batchApi: true,
  },
  caching: {
    supported: true,
    type: 'explicit',
    minTokens: 1024,
    ttlSeconds: 300,
    discountPercent: 90,
  },
}));

export default claude_opus_4_1_20250805;
