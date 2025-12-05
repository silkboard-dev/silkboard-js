/**
 * Grok 2 Image (1212)
 * 
 * Image generation model capable of generating multiple images from text prompt. Powered by Aurora.
 * 
 * @see {@link https://platform.xai.com/docs}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withXaiDefaults } from '../_defaults';

const grok_2_image_1212: ModelDefinition = withXaiDefaults(defineModel({
  id: 'grok-2-image-1212',
  name: 'Grok 2 Image (1212)',
  type: 'image',
  family: 'grok-2',
  status: 'ga',
  description: 'Image generation model capable of generating multiple images from text prompt. Powered by Aurora.',
  aliases: ['grok-2-image', 'grok-2-image-latest'],
  releaseDate: '2024-12-12',
  contextWindow: {
    input: 131_072,
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
    streaming: false,
  },
  features: {
    imageGeneration: true,
  },
}));

export default grok_2_image_1212;
