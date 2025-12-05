/**
 * Claude 3.5 Sonnet (Jun 2024)
 * 
 * Original Claude 3.5 Sonnet.
 * 
 * @see {@link https://platform.anthropic.com/docs}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withAnthropicDefaults } from '../_defaults';

const claude_3_5_sonnet_20240620: ModelDefinition = withAnthropicDefaults(defineModel({
  id: 'claude-3-5-sonnet-20240620',
  name: 'Claude 3.5 Sonnet (Jun 2024)',
  type: 'chat',
  family: 'claude-3.5',
  status: 'ga',
  description: 'Original Claude 3.5 Sonnet.',
  aliases: ['claude-3-5-sonnet'],
  releaseDate: '2024-06-20',
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

export default claude_3_5_sonnet_20240620;
