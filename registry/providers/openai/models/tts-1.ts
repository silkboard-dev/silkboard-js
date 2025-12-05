/**
 * TTS-1
 * 
 * Text-to-speech model
 * 
 * @see {@link https://platform.openai.com/docs}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withOpenaiDefaults } from '../_defaults';

const tts_1: ModelDefinition = withOpenaiDefaults(defineModel({
  id: 'tts-1',
  name: 'TTS-1',
  type: 'audio-speech',
  family: 'tts',
  status: 'ga',
  description: 'Text-to-speech model',
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
      input: 15,
    },
  },
  capabilities: {},
  features: {
    realtimeApi: true,
    assistantsApi: true,
  },
}));

export default tts_1;
