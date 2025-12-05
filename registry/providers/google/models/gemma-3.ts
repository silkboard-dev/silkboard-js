/**
 * Gemma 3
 * 
 * Open source Gemma 3 model family
 * 
 * @see {@link https://platform.google.com/docs}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withGoogleDefaults } from '../_defaults';

const gemma_3: ModelDefinition = withGoogleDefaults(defineModel({
  id: 'gemma-3',
  name: 'Gemma 3',
  type: 'chat',
  family: 'gemma',
  status: 'ga',
  description: 'Open source Gemma 3 model family',
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
    functionCalling: true,
  },
  features: {},
  rateLimits: {
    free: {
      rpm: 30,
      tpm: 15_000,
      rpd: 14_400,
    },
    tier1: {
      rpm: 30,
      tpm: 15_000,
      rpd: 14_400,
    },
  },
}));

export default gemma_3;
