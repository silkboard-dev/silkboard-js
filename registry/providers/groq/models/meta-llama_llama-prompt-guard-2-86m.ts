import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';
import { withGroqDefaults } from '../_defaults';

const meta_llama_llama_prompt_guard_2_86m: ModelDefinition = withGroqDefaults(defineModel({
  id: 'meta-llama/llama-prompt-guard-2-86m',
  name: 'Llama Prompt Guard 2 86M',
  type: 'moderation',
  family: 'llama',
  status: 'preview',
  contextWindow: {
    input: 0, // TODO: Fill in context window (docs list 512 tokens)
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
    // TODO: Fill in pricing from Groq Supported Models page
  },
  capabilities: {},
  features: {},
}));

export default meta_llama_llama_prompt_guard_2_86m;

