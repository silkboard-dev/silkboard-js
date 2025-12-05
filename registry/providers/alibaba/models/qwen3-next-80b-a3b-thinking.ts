import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withAlibabaDefaults } from '../_defaults';

const qwen3_next_80b_a3b_thinking: ModelDefinition = withAlibabaDefaults(defineModel({
  id: 'qwen3-next-80b-a3b-thinking',
  name: 'qwen3-next-80b-a3b-thinking',
  type: 'chat',
  family: 'qwen',
  status: 'ga',
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

export default qwen3_next_80b_a3b_thinking;

