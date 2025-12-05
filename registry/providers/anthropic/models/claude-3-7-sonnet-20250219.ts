/**
 * Claude 3.7 Sonnet
 * 
 * Balanced model with high intelligence and speed.
 * 
 * @see {@link https://platform.anthropic.com/docs}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withAnthropicDefaults } from '../_defaults';

const claude_3_7_sonnet_20250219: ModelDefinition = withAnthropicDefaults(defineModel({
  id: 'claude-3-7-sonnet-20250219',
  name: 'Claude 3.7 Sonnet',
  type: 'chat',
  family: 'claude-3.7',
  status: 'ga',
  description: 'Balanced model with high intelligence and speed.',
  aliases: ['claude-3-7-sonnet'],
  releaseDate: '2025-02-19',
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
  caching: {
    supported: true,
    type: 'explicit',
    minTokens: 1024,
    ttlSeconds: 300,
    discountPercent: 90,
  },
}));

export default claude_3_7_sonnet_20250219;
