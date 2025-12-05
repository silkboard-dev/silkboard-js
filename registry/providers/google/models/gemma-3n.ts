/**
 * Gemma 3n
 * 
 * Nano variant of Gemma 3 for edge deployment
 * 
 * @see {@link https://platform.google.com/docs}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withGoogleDefaults } from '../_defaults';

const gemma_3n: ModelDefinition = withGoogleDefaults(defineModel({
  id: 'gemma-3n',
  name: 'Gemma 3n',
  type: 'chat',
  family: 'gemma',
  status: 'ga',
  description: 'Nano variant of Gemma 3 for edge deployment',
  releaseDate: '2025-03-01',
  contextWindow: {
    input: 128_000,
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
      input: 0,
      output: 0,
    },
  },
  capabilities: {
    streaming: true,
  },
  features: {},
  rateLimits: {
    free: {
      rpm: 30,
      tpm: 15_000,
      rpd: 14_400,
    },
  },
}));

export default gemma_3n;
