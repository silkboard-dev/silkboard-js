/**
 * Llama 3.3 70B Instruct Turbo
 * 
 * together model: meta-llama/Llama-3.3-70B-Instruct-Turbo
 * 
 * @see {@link https://platform.together.com/docs}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withTogetherDefaults } from '../_defaults';

const meta_llama_Llama_3_3_70B_Instruct_Turbo: ModelDefinition = withTogetherDefaults(defineModel({
  id: 'meta-llama/Llama-3.3-70B-Instruct-Turbo',
  name: 'Llama 3.3 70B Instruct Turbo',
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
      input: 0.88,
      output: 0.88,
    },
  },
  capabilities: {
    functionCalling: true,
    streaming: true,
    systemPrompt: true,
  },
  features: {},
}));

export default meta_llama_Llama_3_3_70B_Instruct_Turbo;
