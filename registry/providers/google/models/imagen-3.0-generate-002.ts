/**
 * Imagen 3
 * 
 * Previous generation Imagen model
 * 
 * @see {@link https://platform.google.com/docs}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withGoogleDefaults } from '../_defaults';

const imagen_3_0_generate_002: ModelDefinition = withGoogleDefaults(defineModel({
  id: 'imagen-3.0-generate-002',
  name: 'Imagen 3',
  type: 'image-generation',
  family: 'imagen-3',
  status: 'ga',
  description: 'Previous generation Imagen model',
  releaseDate: '2025-02-01',
  contextWindow: {
    input: 0,
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
      rpm: 20,
    },
  },
}));

export default imagen_3_0_generate_002;
