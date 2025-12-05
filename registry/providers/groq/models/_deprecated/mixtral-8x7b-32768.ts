import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';
import { withGroqDefaults } from '../_defaults';

const mixtral_8x7b_32768: ModelDefinition = withGroqDefaults(defineModel({
  id: 'mixtral-8x7b-32768',
  name: 'Mixtral 8x7B',
  type: 'chat',
  family: 'mixtral',
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

export default mixtral_8x7b_32768;

