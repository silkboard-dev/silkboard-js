import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';
import { withGroqDefaults } from '../_defaults';

const qwen_qwq_32b_preview: ModelDefinition = withGroqDefaults(defineModel({
  id: 'qwen/qwq-32b-preview',
  name: 'Qwen QwQ 32B Preview',
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

export default qwen_qwq_32b_preview;

