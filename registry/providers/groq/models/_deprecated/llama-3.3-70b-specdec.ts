import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';
import { withGroqDefaults } from '../_defaults';

const llama_3_3_70b_specdec: ModelDefinition = withGroqDefaults(defineModel({
  id: 'llama-3.3-70b-specdec',
  name: 'Llama 3.3 70B SpecDec',
  type: 'chat',
  family: 'llama',
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

export default llama_3_3_70b_specdec;

