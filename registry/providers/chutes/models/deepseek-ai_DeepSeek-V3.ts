/**
 * DeepSeek V3
 * 
 * DeepSeek V3 on Chutes
 * 
 * @see {@link https://platform.chutes.com/docs}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withChutesDefaults } from '../_defaults';

const deepseek_ai_DeepSeek_V3: ModelDefinition = withChutesDefaults(defineModel({
  id: 'deepseek-ai/DeepSeek-V3',
  name: 'DeepSeek V3',
  type: 'chat',
  family: 'deepseek',
  status: 'ga',
  description: 'DeepSeek V3 on Chutes',
  contextWindow: {
    input: 0, // TODO: Verify context window
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
      input: 0, // TODO: Add official pricing
      output: 0, // TODO: Add official pricing
    },
  },
  capabilities: {},
  features: {},
  reasoning: {
    supported: false, // TODO: Confirm reasoning support
  },
}));

export default deepseek_ai_DeepSeek_V3;
