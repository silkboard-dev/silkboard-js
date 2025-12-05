/**
 * Lyria Realtime
 * 
 * Real-time music generation model
 * 
 * @see {@link https://platform.google.com/docs}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withGoogleDefaults } from '../_defaults';

const lyria_realtime_exp: ModelDefinition = withGoogleDefaults(defineModel({
  id: 'lyria-realtime-exp',
  name: 'Lyria Realtime',
  type: 'music-generation',
  family: 'lyria',
  status: 'experimental',
  description: 'Real-time music generation model',
  releaseDate: '2025-06-01',
  contextWindow: {
    input: 0,
  },
  modalities: {
    input: {
      text: true,
    },
    output: {
      audio: true,
    },
  },
  pricing: {
    standard: {
      input: 0,
    },
    unit: {
      perSecond: 0.1,
    },
  },
  capabilities: {
    musicGeneration: true,
  },
  features: {},
}));

export default lyria_realtime_exp;
