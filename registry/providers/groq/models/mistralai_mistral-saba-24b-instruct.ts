import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';
import { withGroqDefaults } from '../_defaults';

const mistralai_mistral_saba_24b_instruct: ModelDefinition = withGroqDefaults(defineModel({
  id: 'mistralai/mistral-saba-24b-instruct',
  name: 'Mistral Saba 24B Instruct',
  type: 'chat',
  family: 'mistral',
  status: 'ga',
  contextWindow: {
    input: 0, // TODO: Verify context window (pricing page lists 32k)
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
    // TODO: Verify pricing from Groq pricing page
  },
  capabilities: {},
  features: {},
}));

export default mistralai_mistral_saba_24b_instruct;
