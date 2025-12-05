/**
 * Abab 6.5g Chat
 * 
 * General MiniMax model
 * 
 * @see {@link https://platform.minimax.com/docs}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withMinimaxDefaults } from '../_defaults';

const abab6_5g_chat: ModelDefinition = withMinimaxDefaults(defineModel({
  id: 'abab6.5g-chat',
  name: 'Abab 6.5g Chat',
  type: 'chat',
  family: 'abab6.5g',
  status: 'ga',
  description: 'General MiniMax model',
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
      input: 0.7,
      output: 0.7,
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

export default abab6_5g_chat;
