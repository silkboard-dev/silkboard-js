import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';
import { withGroqDefaults } from '../_defaults';

const qwen_qwen3_32b: ModelDefinition = withGroqDefaults(defineModel({
  id: 'qwen/qwen3-32b',
  name: 'Qwen 3 32B',
  type: 'chat',
  family: 'qwen',
  status: 'ga',
  contextWindow: {
    input: 0, // TODO: Verify context window (docs mention ~131k)
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

export default qwen_qwen3_32b;
