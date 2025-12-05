/**
 * GPT Image 1
 * 
 * Multimodal image generation model
 * 
 * @see {@link https://platform.openai.com/docs}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withOpenaiDefaults } from '../_defaults';

const gpt_image_1: ModelDefinition = withOpenaiDefaults(defineModel({
  id: 'gpt-image-1',
  name: 'GPT Image 1',
  type: 'image-generation',
  family: 'gpt-image',
  status: 'ga',
  description: 'Multimodal image generation model',
  architecture: {},
  contextWindow: {
    input: 0,
  },
  modalities: {
    input: {
      text: true,
      image: true,
    },
    output: {
      image: true,
    },
  },
  pricing: {
    standard: {
      input: 5,
      output: 40,
      cachedInput: 1.25,
    },
    modality: {
      text: {
        input: 5,
        cachedInput: 1.25,
      },
      image: {
        input: 10,
        output: 40,
        cachedInput: 2.5,
      },
    },
  },
  capabilities: {
    structuredOutput: false,
  },
  features: {
    imageGeneration: true,
    promptCaching: true,
    batchApi: true,
  },
}));

export default gpt_image_1;
