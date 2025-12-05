/**
 * Grok 2 (1212)
 * 
 * Improved accuracy, instruction-following, and multi-lingual capabilities.
 * 
 * @see {@link https://platform.xai.com/docs}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withXaiDefaults } from '../_defaults';

const grok_2_1212: ModelDefinition = withXaiDefaults(defineModel({
  id: 'grok-2-1212',
  name: 'Grok 2 (1212)',
  type: 'chat',
  family: 'grok-2',
  status: 'ga',
  description: 'Improved accuracy, instruction-following, and multi-lingual capabilities.',
  aliases: ['grok-2', 'grok-2-latest'],
  releaseDate: '2024-12-12',
  contextWindow: {
    input: 131_072,
    output: 32_768,
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
      input: 2,
      output: 10,
      cachedInput: 0.2,
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
    webSearch: true,
    promptCaching: true,
  },
  caching: {
    supported: true,
    type: 'automatic',
  },
}));

export default grok_2_1212;
