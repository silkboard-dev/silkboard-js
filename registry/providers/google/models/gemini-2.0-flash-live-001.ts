/**
 * Gemini 2.0 Flash Live
 * 
 * Real-time voice and video interactions with low-latency streaming
 * 
 * @see {@link https://platform.google.com/docs}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withGoogleDefaults } from '../_defaults';

const gemini_2_0_flash_live_001: ModelDefinition = withGoogleDefaults(defineModel({
  id: 'gemini-2.0-flash-live-001',
  name: 'Gemini 2.0 Flash Live',
  type: 'live',
  family: 'gemini-2.0',
  status: 'preview',
  description: 'Real-time voice and video interactions with low-latency streaming',
  releaseDate: '2025-04-01',
  contextWindow: {
    input: 1_048_576,
    output: 8192,
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
        input: 0.1,
        output: 0.4,
      },
      audio: {
        input: 0.7,
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
    webSearch: true,
  },
}));

export default gemini_2_0_flash_live_001;
