import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';
import { withGroqDefaults } from '../_defaults';

const meta_llama_llama_4_maverick_17b_128e_instruct: ModelDefinition = withGroqDefaults(defineModel({
  id: 'meta-llama/llama-4-maverick-17b-128e-instruct',
  name: 'Llama 4 Maverick 17Bx128E Instruct',
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

export default meta_llama_llama_4_maverick_17b_128e_instruct;
