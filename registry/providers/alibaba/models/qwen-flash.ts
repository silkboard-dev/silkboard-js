import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withAlibabaDefaults } from '../_defaults';

const qwen_flash: ModelDefinition = withAlibabaDefaults(defineModel({
  id: 'qwen-flash',
  name: 'Qwen Flash',
  type: 'chat',
  family: 'qwen',
  status: 'ga',
  description: 'Latency-optimized Qwen model',
  contextWindow: {
    input: 0, // TODO: Verify context window
    output: 0, // TODO: Verify max output tokens
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

export default qwen_flash;
