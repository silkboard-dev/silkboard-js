/**
 * GPT Image 1 Mini
 * 
 * Lower-cost GPT Image variant
 * 
 * @see {@link https://platform.openai.com/docs}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withOpenaiDefaults } from '../_defaults';

const gpt_image_1_mini: ModelDefinition = withOpenaiDefaults(defineModel({
  id: 'gpt-image-1-mini',
  name: 'GPT Image 1 Mini',
  type: 'image-generation',
  family: 'gpt-image',
  status: 'ga',
  description: 'Lower-cost GPT Image variant',
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
      input: 2,
      output: 8,
      cachedInput: 0.2,
    },
    modality: {
      text: {
        input: 2,
        cachedInput: 0.2,
      },
      image: {
        input: 2.5,
        output: 8,
        cachedInput: 0.25,
      },
    },
  },
  capabilities: {},
  features: {
    imageGeneration: true,
    promptCaching: true,
  },
}));

export default gpt_image_1_mini;
