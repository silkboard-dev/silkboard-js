/**
 * Abab 6.5t Chat
 * 
 * Turbo MiniMax model
 * 
 * @see {@link https://platform.minimax.com/docs}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withMinimaxDefaults } from '../_defaults';

const abab6_5t_chat: ModelDefinition = withMinimaxDefaults(defineModel({
  id: 'abab6.5t-chat',
  name: 'Abab 6.5t Chat',
  type: 'chat',
  family: 'abab6.5t',
  status: 'ga',
  description: 'Turbo MiniMax model',
  contextWindow: {
    input: 8192,
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
      input: 0.14,
      output: 0.14,
    },
  },
  capabilities: {
    vision: false,
    functionCalling: true,
    streaming: true,
    systemPrompt: true,
  },
  features: {},
}));

export default abab6_5t_chat;
