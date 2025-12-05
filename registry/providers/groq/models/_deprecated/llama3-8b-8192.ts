import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';
import { withGroqDefaults } from '../_defaults';

const llama3_8b_8192: ModelDefinition = withGroqDefaults(defineModel({
  id: 'llama3-8b-8192',
  name: 'Llama 3 8B 8K',
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

export default llama3_8b_8192;

