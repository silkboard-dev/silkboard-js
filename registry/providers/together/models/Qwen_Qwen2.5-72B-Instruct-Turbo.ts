/**
 * Qwen 2.5 72B Instruct Turbo
 * 
 * together model: Qwen/Qwen2.5-72B-Instruct-Turbo
 * 
 * @see {@link https://platform.together.com/docs}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withTogetherDefaults } from '../_defaults';

const Qwen_Qwen2_5_72B_Instruct_Turbo: ModelDefinition = withTogetherDefaults(defineModel({
  id: 'Qwen/Qwen2.5-72B-Instruct-Turbo',
  name: 'Qwen 2.5 72B Instruct Turbo',
  type: 'chat',
  family: 'Qwen/Qwen2.5',
  status: 'ga',
  contextWindow: {
    input: 32_768,
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
      input: 1.2,
      output: 1.2,
    },
  },
  capabilities: {
    functionCalling: true,
    streaming: true,
    systemPrompt: true,
  },
  features: {},
}));

export default Qwen_Qwen2_5_72B_Instruct_Turbo;
