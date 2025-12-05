/**
 * Gemini Robotics ER 1.5 Preview
 * 
 * Robotics embodied reasoning model
 * 
 * @see {@link https://platform.google.com/docs}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withGoogleDefaults } from '../_defaults';

const gemini_robotics_er_1_5_preview: ModelDefinition = withGoogleDefaults(defineModel({
  id: 'gemini-robotics-er-1.5-preview',
  name: 'Gemini Robotics ER 1.5 Preview',
  type: 'robotics',
  family: 'gemini-robotics',
  status: 'preview',
  description: 'Robotics embodied reasoning model',
  releaseDate: '2025-06-01',
  contextWindow: {
    input: 1_048_576,
    output: 65_536,
  },
  modalities: {
    input: {
      text: true,
      image: true,
      video: true,
    },
    output: {
      text: true,
    },
  },
  pricing: {
    standard: {
      input: 0.15,
      output: 0.6,
    },
  },
  capabilities: {
    streaming: true,
    functionCalling: true,
  },
  features: {
    robotics: true,
  },
  rateLimits: {
    free: {
      rpm: 10,
      tpm: 250_000,
      rpd: 250,
    },
    tier1: {
      rpm: 300,
      tpm: 1_000_000,
      rpd: 10_000,
    },
    tier2: {
      rpm: 400,
      tpm: 3_000_000,
      rpd: 100_000,
    },
    tier3: {
      rpm: 600,
      tpm: 8_000_000,
    },
  },
}));

export default gemini_robotics_er_1_5_preview;
