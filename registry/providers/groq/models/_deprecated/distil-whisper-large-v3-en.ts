import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';
import { withGroqDefaults } from '../_defaults';

const distil_whisper_large_v3_en: ModelDefinition = withGroqDefaults(defineModel({
  id: 'distil-whisper-large-v3-en',
  name: 'Distil Whisper Large V3 English',
  type: 'audio-transcription',
  family: 'whisper',
  status: 'deprecated',
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
  },
  capabilities: {},
  features: {},
}));

export default distil_whisper_large_v3_en;

