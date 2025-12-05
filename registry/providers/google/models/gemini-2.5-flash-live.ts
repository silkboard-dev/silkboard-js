/**
 * Gemini 2.5 Flash Live
 * 
 * Real-time voice and video interactions with Gemini 2.5 Flash
 * 
 * @see {@link https://platform.google.com/docs}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withGoogleDefaults } from '../_defaults';

const gemini_2_5_flash_live: ModelDefinition = withGoogleDefaults(defineModel({
  id: 'gemini-2.5-flash-live',
  name: 'Gemini 2.5 Flash Live',
  type: 'live',
  family: 'gemini-2.5',
  status: 'preview',
  description: 'Real-time voice and video interactions with Gemini 2.5 Flash',
  releaseDate: '2025-05-01',
  contextWindow: {
    input: 1_048_576,
    output: 65_536,
  },
  modalities: {
    input: {
      text: true,
      image: true,
      video: true,
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
    functionCalling: true,
  },
  features: {
    liveApi: true,
    realtimeApi: true,
  },
  rateLimits: {
    free: {
      tpm: 1_000_000,
    },
  },
}));

export default gemini_2_5_flash_live;
