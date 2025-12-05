/**
 * Veo 3.1 Fast
 * 
 * Fast video generation model
 * 
 * @see {@link https://platform.google.com/docs}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withGoogleDefaults } from '../_defaults';

const veo_3_1_fast: ModelDefinition = withGoogleDefaults(defineModel({
  id: 'veo-3.1-fast',
  name: 'Veo 3.1 Fast',
  type: 'video-generation',
  family: 'veo',
  status: 'preview',
  description: 'Fast video generation model',
  releaseDate: '2025-10-01',
  contextWindow: {
    input: 0,
  },
  modalities: {
    input: {
      text: true,
      image: true,
    },
    output: {
      video: true,
      audio: true,
    },
  },
  pricing: {
    standard: {
      input: 0,
    },
    unit: {
      perSecond: 0.25,
    },
  },
  capabilities: {
    videoGeneration: true,
  },
  features: {},
  rateLimits: {
    tier1: {
      rpm: 2,
      rpd: 10,
    },
    tier2: {
      rpm: 4,
      rpd: 50,
    },
    tier3: {
      rpm: 6,
      rpd: 100,
    },
  },
}));

export default veo_3_1_fast;
