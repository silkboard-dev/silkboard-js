/**
 * Claude 3 Haiku
 * 
 * Fast and affordable Claude 3.
 * 
 * @see {@link https://platform.anthropic.com/docs}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withAnthropicDefaults } from '../_defaults';

const claude_3_haiku_20240307: ModelDefinition = withAnthropicDefaults(defineModel({
  id: 'claude-3-haiku-20240307',
  name: 'Claude 3 Haiku',
  type: 'chat',
  family: 'claude-3',
  status: 'ga',
  description: 'Fast and affordable Claude 3.',
  aliases: ['claude-3-haiku'],
  releaseDate: '2024-03-07',
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
      input: 0.25,
      output: 1.25,
      cachedInput: 0.03,
    },
    promptCaching: {
      write: 0.3,
      read: 0.03,
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

export default claude_3_haiku_20240307;
