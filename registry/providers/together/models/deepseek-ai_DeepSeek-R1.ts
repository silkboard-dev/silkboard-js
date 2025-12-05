/**
 * DeepSeek R1
 * 
 * together model: deepseek-ai/DeepSeek-R1
 * 
 * @see {@link https://platform.together.com/docs}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withTogetherDefaults } from '../_defaults';

const deepseek_ai_DeepSeek_R1: ModelDefinition = withTogetherDefaults(defineModel({
  id: 'deepseek-ai/DeepSeek-R1',
  name: 'DeepSeek R1',
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
      input: 3,
      output: 7,
    },
  },
  capabilities: {
    streaming: true,
    systemPrompt: true,
  },
  features: {},
  reasoning: {
    supported: true,
    type: 'native',
  },
}));

export default deepseek_ai_DeepSeek_R1;
