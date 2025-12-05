import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';
import { withGroqDefaults } from '../_defaults';

const meta_llama_llama_guard_4_12b: ModelDefinition = withGroqDefaults(defineModel({
  id: 'meta-llama/llama-guard-4-12b',
  name: 'Llama Guard 4 12B',
  type: 'moderation',
  family: 'llama',
  status: 'ga',
  contextWindow: {
    input: 0, // TODO: Verify context window (pricing page lists 128k)
  },
  modalities: {
    input: {
      text: true,
      image: true,
    },
    output: {
      text: true,
    },
  },
  pricing: {
    standard: {
      input: 0,
      output: 0,
    },
    // TODO: Verify pricing/availability
  },
  capabilities: {},
  features: {},
}));

export default meta_llama_llama_guard_4_12b;
