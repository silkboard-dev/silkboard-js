/**
 * Gemini 2.0 Flash Preview Image Generation
 * 
 * Image generation capabilities for Gemini 2.0 Flash
 * 
 * @see {@link https://platform.google.com/docs}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withGoogleDefaults } from '../_defaults';

const gemini_2_0_flash_preview_image_generation: ModelDefinition = withGoogleDefaults(defineModel({
  id: 'gemini-2.0-flash-preview-image-generation',
  name: 'Gemini 2.0 Flash Preview Image Generation',
  type: 'image-generation',
  family: 'gemini-2.0',
  status: 'preview',
  description: 'Image generation capabilities for Gemini 2.0 Flash',
  releaseDate: '2025-03-01',
  contextWindow: {
    input: 1_048_576,
    output: 8192,
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
      input: 0.1,
      output: 0.4,
    },
    batch: {
      input: 0,
    },
    modality: {
      image: {
        input: 0,
        output: 0.039,
      },
    },
  },
  capabilities: {
    streaming: true,
    functionCalling: true,
  },
  features: {
    imageGeneration: true,
  },
  rateLimits: {
    free: {
      rpm: 10,
      tpm: 200_000,
      rpd: 100,
    },
    tier1: {
      rpm: 1000,
      tpm: 1_000_000,
      rpd: 10_000,
    },
  },
}));

export default gemini_2_0_flash_preview_image_generation;
