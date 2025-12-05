/**
 * Abab 6.5s Chat
 * 
 * Latest MiniMax chat model
 * 
 * @see {@link https://platform.minimax.com/docs}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withMinimaxDefaults } from '../_defaults';

const abab6_5s_chat: ModelDefinition = withMinimaxDefaults(defineModel({
  id: 'abab6.5s-chat',
  name: 'Abab 6.5s Chat',
  type: 'chat',
  family: 'abab6.5s',
  status: 'ga',
  description: 'Latest MiniMax chat model',
  contextWindow: {
    input: 245_760,
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

export default abab6_5s_chat;
