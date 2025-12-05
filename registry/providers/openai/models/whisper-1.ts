/**
 * Whisper
 * 
 * Speech-to-text transcription model
 * 
 * @see {@link https://platform.openai.com/docs}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withOpenaiDefaults } from '../_defaults';

const whisper_1: ModelDefinition = withOpenaiDefaults(defineModel({
  id: 'whisper-1',
  name: 'Whisper',
  type: 'audio-transcription',
  family: 'whisper',
  status: 'ga',
  description: 'Speech-to-text transcription model',
  architecture: {},
  contextWindow: {
    input: 0,
  },
  modalities: {
    input: {
      audio: true,
      file: true,
    },
    output: {
      text: true,
    },
  },
  pricing: {
    standard: {
      input: 0,
    },
    unit: {
      perSecond: 0.0001,
    },
  },
  capabilities: {
    streaming: true,
  },
  features: {
    batchApi: true,
  },
}));

export default whisper_1;
