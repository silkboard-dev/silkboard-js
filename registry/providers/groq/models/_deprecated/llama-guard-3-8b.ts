import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';
import { withGroqDefaults } from '../_defaults';

const llama_guard_3_8b: ModelDefinition = withGroqDefaults(defineModel({
  id: 'llama-guard-3-8b',
  name: 'Llama Guard 3 8B',
  type: 'moderation',
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

export default llama_guard_3_8b;

