import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';
import { withBasetenDefaults } from '../_defaults';

const deepseek_ai_DeepSeek_R1_0528: ModelDefinition = withBasetenDefaults(defineModel({
  id: 'deepseek-ai/DeepSeek-R1-0528',
  name: 'DeepSeek R1 0528',
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
      input: 2.55,
      output: 5.95,
    },
  },
  capabilities: {},
  features: {},
}));

export default deepseek_ai_DeepSeek_R1_0528;
