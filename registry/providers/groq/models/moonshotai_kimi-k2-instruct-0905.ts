import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';
import { withGroqDefaults } from '../_defaults';

const moonshotai_kimi_k2_instruct_0905: ModelDefinition = withGroqDefaults(defineModel({
  id: 'moonshotai/kimi-k2-instruct-0905',
  name: 'Moonshot Kimi K2 Instruct 0905',
  type: 'chat',
  family: 'moonshot',
  status: 'ga',
  contextWindow: {
    input: 0, // TODO: Verify context window (pricing page lists 256k)
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

export default moonshotai_kimi_k2_instruct_0905;
