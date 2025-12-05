/**
 * Imagen 4 Ultra
 * 
 * Highest quality Imagen 4 model
 * 
 * @see {@link https://platform.google.com/docs}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withGoogleDefaults } from '../_defaults';

const imagen_4_0_ultra_generate_001: ModelDefinition = withGoogleDefaults(defineModel({
  id: 'imagen-4.0-ultra-generate-001',
  name: 'Imagen 4 Ultra',
  type: 'image-generation',
  family: 'imagen-4',
  status: 'ga',
  description: 'Highest quality Imagen 4 model',
  releaseDate: '2025-06-01',
  contextWindow: {
    input: 480,
  },
  modalities: {
    input: {
      text: true,
    },
    output: {
      image: true,
    },
  },
  pricing: {
    standard: {
      input: 0,
    },
  },
  capabilities: {
    imageGeneration: true,
  },
  features: {},
  rateLimits: {
    tier1: {
      rpm: 5,
      rpd: 30,
    },
    tier2: {
      rpm: 10,
      rpd: 100,
    },
    tier3: {
      rpm: 20,
      rpd: 200,
    },
  },
}));

export default imagen_4_0_ultra_generate_001;
