/**
 * Llama 3.1 8B Instruct Turbo
 * 
 * together model: meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo
 * 
 * @see {@link https://platform.together.com/docs}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withTogetherDefaults } from '../_defaults';

const meta_llama_Meta_Llama_3_1_8B_Instruct_Turbo: ModelDefinition = withTogetherDefaults(defineModel({
  id: 'meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo',
  name: 'Llama 3.1 8B Instruct Turbo',
  type: 'chat',
  family: 'meta',
  status: 'ga',
  contextWindow: {
    input: 131_072,
    output: 4096,
  },
  modalities: {
    input: {
      text: true,
    },
    output: {
      text: true,
    },
  },
  pricing: {
    standard: {
      input: 0.18,
      output: 0.18,
    },
  },
  capabilities: {
    functionCalling: true,
    streaming: true,
    systemPrompt: true,
  },
  features: {},
}));

export default meta_llama_Meta_Llama_3_1_8B_Instruct_Turbo;
