import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';
import { withGroqDefaults } from '../_defaults';

const openai_gpt_oss_120b: ModelDefinition = withGroqDefaults(defineModel({
  id: 'openai/gpt-oss-120b',
  name: 'OpenAI GPT-OSS 120B',
  type: 'chat',
  family: 'openai',
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

export default openai_gpt_oss_120b;
