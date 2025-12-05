/**
 * Grok 4
 * 
 * The world's best model. Flagship reasoning model with advanced capabilities.
 * 
 * @see {@link https://platform.xai.com/docs}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withXaiDefaults } from '../_defaults';

const grok_4: ModelDefinition = withXaiDefaults(defineModel({
  id: 'grok-4',
  name: 'Grok 4',
  type: 'chat',
  family: 'grok-4',
  status: 'ga',
  description: 'The world\'s best model. Flagship reasoning model with advanced capabilities.',
  aliases: ['grok-4-latest', 'grok-4-0709'],
  releaseDate: '2025-07-09',
  contextWindow: {
    input: 256_000,
    output: 131_072,
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
      input: 3,
      output: 15,
      cachedInput: 0.3,
    },
    contextTiers: [
      {
        upTo: 200_000,
        pricing: {
          input: 3,
          output: 15,
        },
      },
      {
        upTo: 'unlimited',
        pricing: {
          input: 6,
          output: 30,
        },
      },
    ],
  },
  capabilities: {
    streaming: true,
    functionCalling: true,
    parallelToolCalls: true,
    structuredOutput: true,
    systemPrompt: true,
  },
  features: {
    webSearch: true,
    promptCaching: true,
    mcp: true,
    imageGeneration: true,
  },
  reasoning: {
    supported: true,
    type: 'native',
  },
  caching: {
    supported: true,
    type: 'automatic',
  },
}));

export default grok_4;
