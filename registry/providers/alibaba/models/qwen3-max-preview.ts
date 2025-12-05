import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withAlibabaDefaults } from '../_defaults';

const qwen3_max_preview: ModelDefinition = withAlibabaDefaults(defineModel({
  id: 'qwen3-max-preview',
  name: 'qwen3-max-preview',
  type: 'chat',
  family: 'qwen',
  status: 'preview',
  contextWindow: {
    input: 0, // TODO: Verify context window from docs
    output: 0, // TODO: Verify max output tokens from docs
  },
  modalities: {
    input: {
      text: true,
    },
    output: {
      text: true,
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

export default qwen3_max_preview;

