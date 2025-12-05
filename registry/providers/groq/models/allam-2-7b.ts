import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';
import { withGroqDefaults } from '../_defaults';

const allam_2_7b: ModelDefinition = withGroqDefaults(defineModel({
  id: 'allam-2-7b',
  name: 'Allam 2 7B',
  type: 'chat',
  family: 'allam',
  status: 'ga', // TODO: Verify model status (production vs preview)
  contextWindow: {
    input: 0, // TODO: Fill in context window from Groq model card
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
    // TODO: Fill in pricing from https://groq.com/pricing
  },
  capabilities: {},
  features: {},
}));

export default allam_2_7b;

