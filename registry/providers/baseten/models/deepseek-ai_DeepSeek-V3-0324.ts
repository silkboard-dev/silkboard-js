import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';
import { withBasetenDefaults } from '../_defaults';

const deepseek_ai_DeepSeek_V3_0324: ModelDefinition = withBasetenDefaults(defineModel({
  id: 'deepseek-ai/DeepSeek-V3-0324',
  name: 'DeepSeek V3 0324',
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
      input: 0.77,
      output: 0.77,
    },
  },
  capabilities: {},
  features: {},
}));

export default deepseek_ai_DeepSeek_V3_0324;
