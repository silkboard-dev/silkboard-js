/**
 * Imagen 4 Standard
 * 
 * Latest Imagen model for high-quality image generation
 * 
 * @see {@link https://platform.google.com/docs}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withGoogleDefaults } from '../_defaults';

const imagen_4_0_generate_001: ModelDefinition = withGoogleDefaults(defineModel({
  id: 'imagen-4.0-generate-001',
  name: 'Imagen 4 Standard',
  type: 'image-generation',
  family: 'imagen-4',
  status: 'ga',
  description: 'Latest Imagen model for high-quality image generation',
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
      rpm: 10,
      rpd: 70,
    },
    tier2: {
      rpm: 20,
      rpd: 200,
    },
    tier3: {
      rpm: 40,
      rpd: 400,
    },
  },
}));

export default imagen_4_0_generate_001;
