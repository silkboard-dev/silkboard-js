import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';
import { withBasetenDefaults } from '../_defaults';

const Qwen_Qwen3_235B_A22B_Instruct_2507: ModelDefinition = withBasetenDefaults(defineModel({
  id: 'Qwen/Qwen3-235B-A22B-Instruct-2507',
  name: 'Qwen3 235B A22B Instruct 2507',
  type: 'chat',
  family: 'qwen',
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
      input: 0.22,
      output: 0.80,
    },
  },
  capabilities: {},
  features: {},
}));

export default Qwen_Qwen3_235B_A22B_Instruct_2507;
