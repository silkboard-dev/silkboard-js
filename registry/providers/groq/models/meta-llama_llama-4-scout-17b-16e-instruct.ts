import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';
import { withGroqDefaults } from '../_defaults';

const meta_llama_llama_4_scout_17b_16e_instruct: ModelDefinition = withGroqDefaults(defineModel({
  id: 'meta-llama/llama-4-scout-17b-16e-instruct',
  name: 'Llama 4 Scout 17Bx16E Instruct',
  type: 'chat',
  family: 'llama',
  status: 'ga',
  contextWindow: {
    input: 0, // TODO: Verify context window (pricing page lists 128k)
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
    // TODO: Verify pricing from https://groq.com/pricing
  },
  capabilities: {},
  features: {},
}));

export default meta_llama_llama_4_scout_17b_16e_instruct;
