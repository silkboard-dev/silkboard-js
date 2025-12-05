/**
 * DeepSeek V3
 * 
 * together model: deepseek-ai/DeepSeek-V3
 * 
 * @see {@link https://platform.together.com/docs}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withTogetherDefaults } from '../_defaults';

const deepseek_ai_DeepSeek_V3: ModelDefinition = withTogetherDefaults(defineModel({
  id: 'deepseek-ai/DeepSeek-V3',
  name: 'DeepSeek V3',
  type: 'chat',
  family: 'deepseek',
  status: 'ga',
  contextWindow: {
    input: 65_536,
    output: 8192,
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
      input: 0.9,
      output: 0.9,
    },
  },
  capabilities: {
    functionCalling: true,
    streaming: true,
    systemPrompt: true,
  },
  features: {},
}));

export default deepseek_ai_DeepSeek_V3;
