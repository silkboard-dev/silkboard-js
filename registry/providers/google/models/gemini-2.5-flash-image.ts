/**
 * Gemini 2.5 Flash Image
 * 
 * Native image generation model optimized for speed, flexibility, and contextual understanding
 * 
 * @see {@link https://platform.google.com/docs}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withGoogleDefaults } from '../_defaults';

const gemini_2_5_flash_image: ModelDefinition = withGoogleDefaults(defineModel({
  id: 'gemini-2.5-flash-image',
  name: 'Gemini 2.5 Flash Image',
  type: 'image-generation',
  family: 'gemini-2.5',
  status: 'preview',
  description: 'Native image generation model optimized for speed, flexibility, and contextual understanding',
  releaseDate: '2025-09-01',
  contextWindow: {
    input: 1_048_576,
    output: 65_536,
  },
  modalities: {
    input: {
      text: true,
      image: true,
    },
    output: {
      text: true,
      image: true,
    },
  },
  pricing: {
    standard: {
      input: 0.15,
      output: 0.6,
    },
    modality: {
      image: {
        input: 0,
        output: 0.0195,
      },
    },
  },
  capabilities: {
    streaming: true,
    functionCalling: true,
    structuredOutput: true,
  },
  features: {
    imageGeneration: true,
  },
}));

export default gemini_2_5_flash_image;
