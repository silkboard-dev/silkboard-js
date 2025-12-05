import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withAlibabaDefaults } from '../_defaults';

const qwen_mt_image: ModelDefinition = withAlibabaDefaults(defineModel({
  id: 'qwen-mt-image',
  name: 'qwen-mt-image',
  type: 'image-generation',
  family: 'qwen',
  status: 'ga',
  contextWindow: {
    input: 0, // TODO: Verify request limits from docs
  },
  modalities: {
    input: {
      image: true,
      text: true,
    },
    output: {
      image: true,
      text: true,
    },
  },
  pricing: {
    standard: {
      input: 0, // TODO: pricing
      output: 0, // TODO: pricing (if text output metered separately)
    },
  },
  capabilities: {
    imageGeneration: true,
  },
  features: {},
}));

export default qwen_mt_image;

