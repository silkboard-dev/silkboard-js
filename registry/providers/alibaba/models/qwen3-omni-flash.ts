import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withAlibabaDefaults } from '../_defaults';

const qwen3_omni_flash: ModelDefinition = withAlibabaDefaults(defineModel({
  id: 'qwen3-omni-flash',
  name: 'qwen3-omni-flash',
  type: 'multimodal',
  family: 'qwen',
  status: 'ga',
  contextWindow: {
    input: 0, // TODO: Verify context window from docs
    output: 0, // TODO: Verify max output tokens from docs
  },
  modalities: {
    input: {
      text: true,
      audio: true,
      image: true,
      video: true,
    },
    output: {
      text: true,
      audio: true,
    },
  },
  pricing: {
    standard: {
      input: 0, // TODO: pricing
      output: 0, // TODO: pricing
    },
  },
  capabilities: {},
  features: {},
}));

export default qwen3_omni_flash;

