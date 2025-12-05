import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';
import { withGroqDefaults } from '../_defaults';

const groq_compound_mini: ModelDefinition = withGroqDefaults(defineModel({
  id: 'groq/compound-mini',
  name: 'Groq Compound Mini',
  type: 'chat',
  family: 'compound',
  status: 'ga',
  contextWindow: {
    input: 0, // TODO: Fill in context window (docs list 128k tokens)
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
    // TODO: Fill in pricing once Groq publishes system-level pricing
  },
  capabilities: {},
  features: {},
}));

export default groq_compound_mini;

