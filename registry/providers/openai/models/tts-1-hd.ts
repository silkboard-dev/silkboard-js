/**
 * TTS-1 HD
 * 
 * High-quality text-to-speech model
 * 
 * @see {@link https://platform.openai.com/docs}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withOpenaiDefaults } from '../_defaults';

const tts_1_hd: ModelDefinition = withOpenaiDefaults(defineModel({
  id: 'tts-1-hd',
  name: 'TTS-1 HD',
  type: 'audio-speech',
  family: 'tts',
  status: 'ga',
  description: 'High-quality text-to-speech model',
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
      input: 30,
    },
  },
  capabilities: {},
  features: {
    realtimeApi: true,
    assistantsApi: true,
  },
}));

export default tts_1_hd;
