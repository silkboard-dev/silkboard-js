/**
 * DeepSeek V3 (via OpenRouter)
 * 
 * openrouter model: deepseek/deepseek-chat
 * 
 * @see {@link https://platform.openrouter.com/docs}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withOpenrouterDefaults } from '../_defaults';

const deepseek_deepseek_chat: ModelDefinition = withOpenrouterDefaults(defineModel({
  id: 'deepseek/deepseek-chat',
  name: 'DeepSeek V3 (via OpenRouter)',
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
}));

export default deepseek_deepseek_chat;
