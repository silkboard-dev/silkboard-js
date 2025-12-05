/**
 * Gemini 2.5 Flash Preview Native Audio
 * 
 * Native audio capabilities for Gemini 2.5 Flash
 * 
 * @see {@link https://platform.google.com/docs}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withGoogleDefaults } from '../_defaults';

const gemini_2_5_flash_preview_native_audio: ModelDefinition = withGoogleDefaults(defineModel({
  id: 'gemini-2.5-flash-preview-native-audio',
  name: 'Gemini 2.5 Flash Preview Native Audio',
  type: 'live',
  family: 'gemini-2.5',
  status: 'preview',
  description: 'Native audio capabilities for Gemini 2.5 Flash',
  releaseDate: '2025-05-01',
  contextWindow: {
    input: 1_048_576,
    output: 65_536,
  },
  modalities: {
    input: {
      text: true,
      audio: true,
    },
    output: {
      text: true,
      audio: true,
    },
  },
  pricing: {
    standard: {
      input: 0,
    },
    modality: {
      text: {
        input: 0.15,
        output: 0.6,
      },
      audio: {
        input: 1.4,
        output: 6,
      },
    },
  },
  capabilities: {
    streaming: true,
  },
  features: {
    liveApi: true,
    speechGeneration: true,
  },
  rateLimits: {
    free: {
      tpm: 500_000,
    },
  },
}));

export default gemini_2_5_flash_preview_native_audio;
