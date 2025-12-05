/**
 * DeepSeek R1 (via OpenRouter)
 * 
 * openrouter model: deepseek/deepseek-r1
 * 
 * @see {@link https://platform.openrouter.com/docs}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withOpenrouterDefaults } from '../_defaults';

const deepseek_deepseek_r1: ModelDefinition = withOpenrouterDefaults(defineModel({
  id: 'deepseek/deepseek-r1',
  name: 'DeepSeek R1 (via OpenRouter)',
  type: 'chat',
  family: 'deepseek/deepseek',
  status: 'ga',
  contextWindow: {
    input: 0,
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
      input: 0,
    },
  },
  capabilities: {},
  features: {},
  reasoning: {
    supported: true,
    type: 'native',
  },
}));

export default deepseek_deepseek_r1;
