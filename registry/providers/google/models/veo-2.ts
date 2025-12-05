/**
 * Veo 2
 * 
 * Previous generation video model
 * 
 * @see {@link https://platform.google.com/docs}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withGoogleDefaults } from '../_defaults';

const veo_2: ModelDefinition = withGoogleDefaults(defineModel({
  id: 'veo-2',
  name: 'Veo 2',
  type: 'video-generation',
  family: 'veo',
  status: 'ga',
  description: 'Previous generation video model',
  releaseDate: '2025-03-01',
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
      rpd: 50,
    },
    tier2: {
      rpm: 2,
      rpd: 50,
    },
    tier3: {
      rpm: 2,
      rpd: 50,
    },
  },
}));

export default veo_2;
