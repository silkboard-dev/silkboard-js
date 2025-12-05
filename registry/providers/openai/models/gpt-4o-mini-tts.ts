/**
 * GPT-4o Mini TTS
 * 
 * Text-to-speech via GPT-4o mini
 * 
 * @see {@link https://platform.openai.com/docs}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withOpenaiDefaults } from '../_defaults';

const gpt_4o_mini_tts: ModelDefinition = withOpenaiDefaults(defineModel({
  id: 'gpt-4o-mini-tts',
  name: 'GPT-4o Mini TTS',
  type: 'audio-speech',
  family: 'gpt-4o',
  status: 'preview',
  description: 'Text-to-speech via GPT-4o mini',
  architecture: {},
  contextWindow: {
    input: 0,
  },
  modalities: {
    input: {
      text: true,
    },
    output: {
      audio: true,
    },
  },
  pricing: {
    standard: {
      input: 0.6,
      output: 12,
    },
  },
  capabilities: {},
  features: {
    realtimeApi: true,
  },
}));

export default gpt_4o_mini_tts;
