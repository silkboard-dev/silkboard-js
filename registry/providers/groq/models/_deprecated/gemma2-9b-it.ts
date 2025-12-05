import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';
import { withGroqDefaults } from '../_defaults';

const gemma2_9b_it: ModelDefinition = withGroqDefaults(defineModel({
  id: 'gemma2-9b-it',
  name: 'Gemma 2 9B IT',
  type: 'chat',
  family: 'gemma2',
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

export default gemma2_9b_it;

