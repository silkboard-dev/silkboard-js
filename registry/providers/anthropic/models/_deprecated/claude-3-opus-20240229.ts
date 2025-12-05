/**
 * Claude 3 Opus
 * 
 * Most capable Claude 3 model.
 * 
 * @see {@link https://platform.anthropic.com/docs}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withAnthropicDefaults } from '../_defaults';

const claude_3_opus_20240229: ModelDefinition = withAnthropicDefaults(defineModel({
  id: 'claude-3-opus-20240229',
  name: 'Claude 3 Opus',
  type: 'chat',
  family: 'claude-3',
  status: 'ga',
  description: 'Most capable Claude 3 model.',
  aliases: ['claude-3-opus'],
  releaseDate: '2024-02-29',
  contextWindow: {
    input: 200_000,
    output: 4096,
  },
  modalities: {
    input: {
      text: true,
      image: true,
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

export default claude_3_opus_20240229;
