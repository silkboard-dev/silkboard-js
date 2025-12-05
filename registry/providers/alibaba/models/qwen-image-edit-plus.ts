import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withAlibabaDefaults } from '../_defaults';

const qwen_image_edit_plus: ModelDefinition = withAlibabaDefaults(defineModel({
  id: 'qwen-image-edit-plus',
  name: 'qwen-image-edit-plus',
  type: 'image-generation',
  family: 'qwen',
  status: 'ga',
  contextWindow: {
    input: 0, // TODO: Verify request limits from docs
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
      input: 0, // TODO: pricing
    },
  },
  capabilities: {
    imageGeneration: true,
  },
  features: {},
}));

export default qwen_image_edit_plus;

