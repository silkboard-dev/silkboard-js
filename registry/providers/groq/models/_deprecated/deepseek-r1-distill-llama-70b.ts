import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';
import { withGroqDefaults } from '../_defaults';

const deepseek_r1_distill_llama_70b: ModelDefinition = withGroqDefaults(defineModel({
  id: 'deepseek-r1-distill-llama-70b',
  name: 'DeepSeek R1 Distill Llama 70B',
  type: 'chat',
  family: 'deepseek',
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

export default deepseek_r1_distill_llama_70b;

