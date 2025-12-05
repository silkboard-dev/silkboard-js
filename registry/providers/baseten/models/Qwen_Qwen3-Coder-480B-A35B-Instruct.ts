import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';
import { withBasetenDefaults } from '../_defaults';

const Qwen_Qwen3_Coder_480B_A35B_Instruct: ModelDefinition = withBasetenDefaults(defineModel({
  id: 'Qwen/Qwen3-Coder-480B-A35B-Instruct',
  name: 'Qwen3 Coder 480B A35B Instruct',
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
      input: 0.38,
      output: 1.53,
    },
  },
  capabilities: {},
  features: {},
}));

export default Qwen_Qwen3_Coder_480B_A35B_Instruct;
