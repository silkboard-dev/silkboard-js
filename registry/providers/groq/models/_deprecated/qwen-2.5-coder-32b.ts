import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';
import { withGroqDefaults } from '../_defaults';

const qwen_2_5_coder_32b: ModelDefinition = withGroqDefaults(defineModel({
  id: 'qwen-2.5-coder-32b',
  name: 'Qwen 2.5 Coder 32B',
  type: 'chat',
  family: 'qwen',
  status: 'deprecated',
  contextWindow: {
    input: 0,
  },
  modalities: {
    input: { text: true },
    output: { text: true },
  },
  pricing: {
    standard: {
      input: 0,
      output: 0,
    },
  },
  capabilities: {},
  features: {},
}));

export default qwen_2_5_coder_32b;

