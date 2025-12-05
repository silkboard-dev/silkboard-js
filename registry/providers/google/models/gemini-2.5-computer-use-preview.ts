/**
 * Gemini 2.5 Computer Use Preview
 * 
 * Model for computer use and automation tasks
 * 
 * @see {@link https://platform.google.com/docs}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withGoogleDefaults } from '../_defaults';

const gemini_2_5_computer_use_preview: ModelDefinition = withGoogleDefaults(defineModel({
  id: 'gemini-2.5-computer-use-preview',
  name: 'Gemini 2.5 Computer Use Preview',
  type: 'chat',
  family: 'gemini-2.5',
  status: 'preview',
  description: 'Model for computer use and automation tasks',
  releaseDate: '2025-09-01',
  contextWindow: {
    input: 1_048_576,
    output: 65_536,
  },
  modalities: {
    input: {
      text: true,
      image: true,
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
    structuredOutput: true,
  },
  features: {
    computerUse: true,
  },
  rateLimits: {
    tier1: {
      rpm: 150,
      tpm: 2_000_000,
      rpd: 10_000,
    },
    tier2: {
      rpm: 1000,
      tpm: 5_000_000,
      rpd: 50_000,
    },
    tier3: {
      rpm: 2000,
      tpm: 8_000_000,
    },
  },
}));

export default gemini_2_5_computer_use_preview;
