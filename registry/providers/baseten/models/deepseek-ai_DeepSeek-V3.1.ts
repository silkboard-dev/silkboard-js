import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';
import { withBasetenDefaults } from '../_defaults';

const deepseek_ai_DeepSeek_V3_1: ModelDefinition = withBasetenDefaults(defineModel({
  id: 'deepseek-ai/DeepSeek-V3.1',
  name: 'DeepSeek V3.1',
  type: 'chat',
  family: 'deepseek',
  status: 'ga',
  contextWindow: {
    input: 163_000,
  },
  modalities: {
    input: { text: true },
    output: { text: true },
  },
  pricing: {
    standard: {
      input: 0.50,
      output: 1.50,
    },
  },
  capabilities: {},
  features: {},
}));

export default deepseek_ai_DeepSeek_V3_1;
