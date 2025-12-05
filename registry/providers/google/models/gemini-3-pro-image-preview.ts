/**
 * Gemini 3 Pro Image Preview
 * 
 * Native image generation model optimized for speed, flexibility, and contextual understanding
 * 
 * @see {@link https://platform.google.com/docs}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withGoogleDefaults } from '../_defaults';

const gemini_3_pro_image_preview: ModelDefinition = withGoogleDefaults(defineModel({
  id: 'gemini-3-pro-image-preview',
  name: 'Gemini 3 Pro Image Preview',
  type: 'image-generation',
  family: 'gemini-3',
  status: 'preview',
  description: 'Native image generation model optimized for speed, flexibility, and contextual understanding',
  releaseDate: '2025-11-18',
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
      input: 2,
      output: 12,
    },
    batch: {
      input: 1,
      output: 6,
    },
    modality: {
      text: {
        input: 2,
        output: 12,
      },
      image: {
        input: 0.0011,
        output: 0.134,
      },
    },
  },
  capabilities: {
    streaming: true,
    functionCalling: true,
    structuredOutput: true,
    systemPrompt: true,
  },
  features: {
    imageGeneration: true,
  },
}));

export default gemini_3_pro_image_preview;
