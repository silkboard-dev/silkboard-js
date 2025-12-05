/**
 * Claude 3.5 Haiku
 * 
 * Fast and affordable Claude 3.5.
 * 
 * @see {@link https://platform.anthropic.com/docs}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withAnthropicDefaults } from '../_defaults';

const claude_3_5_haiku_20241022: ModelDefinition = withAnthropicDefaults(defineModel({
  id: 'claude-3-5-haiku-20241022',
  name: 'Claude 3.5 Haiku',
  type: 'chat',
  family: 'claude-3.5',
  status: 'ga',
  description: 'Fast and affordable Claude 3.5.',
  aliases: ['claude-3-5-haiku'],
  releaseDate: '2024-10-22',
  contextWindow: {
    input: 200_000,
    output: 8192,
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
      input: 0.8,
      output: 4,
      cachedInput: 0.08,
    },
    batch: {
      input: 0.4,
      output: 2,
      discountPercent: 50,
    },
    promptCaching: {
      write: 1,
      read: 0.08,
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

export default claude_3_5_haiku_20241022;
