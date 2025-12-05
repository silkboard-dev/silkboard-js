import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';
import { withGroqDefaults } from '../_defaults';

const whisper_large_v3_turbo: ModelDefinition = withGroqDefaults(defineModel({
  id: 'whisper-large-v3-turbo',
  name: 'Whisper Large V3 Turbo',
  type: 'audio-transcription',
  family: 'whisper',
  status: 'ga',
  contextWindow: {
    input: 0, // TODO: Verify audio input limits
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
    // TODO: Verify transcription pricing
  },
  capabilities: {},
  features: {},
}));

export default whisper_large_v3_turbo;
