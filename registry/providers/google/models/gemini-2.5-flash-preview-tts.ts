/**
 * Gemini 2.5 Flash Preview TTS
 * 
 * Text-to-speech model for audio generation
 * 
 * @see {@link https://platform.google.com/docs}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withGoogleDefaults } from '../_defaults';

const gemini_2_5_flash_preview_tts: ModelDefinition = withGoogleDefaults(defineModel({
  id: 'gemini-2.5-flash-preview-tts',
  name: 'Gemini 2.5 Flash Preview TTS',
  type: 'tts',
  family: 'gemini-2.5',
  status: 'preview',
  description: 'Text-to-speech model for audio generation',
  releaseDate: '2025-05-01',
  contextWindow: {
    input: 1_048_576,
    output: 65_536,
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
      input: 0.15,
      output: 0.6,
    },
    modality: {
      audio: {
        input: 0,
        output: 6,
      },
    },
  },
  capabilities: {
    streaming: true,
  },
  features: {
    speechGeneration: true,
  },
  rateLimits: {
    free: {
      rpm: 3,
      tpm: 10_000,
      rpd: 15,
    },
  },
}));

export default gemini_2_5_flash_preview_tts;
