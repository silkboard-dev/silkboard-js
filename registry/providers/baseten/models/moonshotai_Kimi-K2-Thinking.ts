import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';
import { withBasetenDefaults } from '../_defaults';

const moonshotai_Kimi_K2_Thinking: ModelDefinition = withBasetenDefaults(defineModel({
  id: 'moonshotai/Kimi-K2-Thinking',
  name: 'Kimi K2 Thinking',
  type: 'chat',
  family: 'moonshotai',
  status: 'ga',
  contextWindow: {
    input: 262_000,
  },
  modalities: {
    input: { text: true },
    output: { text: true },
  },
  pricing: {
    standard: {
      input: 0.60,
      output: 2.50,
    },
  },
  capabilities: {},
  features: {},
}));

export default moonshotai_Kimi_K2_Thinking;
