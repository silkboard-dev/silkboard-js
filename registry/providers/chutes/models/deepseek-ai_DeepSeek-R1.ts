/**
 * DeepSeek R1
 * 
 * DeepSeek R1 on Chutes
 * 
 * @see {@link https://platform.chutes.com/docs}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withChutesDefaults } from '../_defaults';

const deepseek_ai_DeepSeek_R1: ModelDefinition = withChutesDefaults(defineModel({
  id: 'deepseek-ai/DeepSeek-R1',
  name: 'DeepSeek R1',
  type: 'chat',
  family: 'deepseek',
  status: 'ga',
  description: 'DeepSeek R1 on Chutes',
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

export default deepseek_ai_DeepSeek_R1;
