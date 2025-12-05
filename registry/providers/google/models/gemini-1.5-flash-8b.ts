/**
 * Gemini 1.5 Flash 8B
 * 
 * Smallest and fastest Gemini 1.5
 * 
 * @see {@link https://platform.google.com/docs}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withGoogleDefaults } from '../_defaults';

const gemini_1_5_flash_8b: ModelDefinition = withGoogleDefaults(defineModel({
  id: 'gemini-1.5-flash-8b',
  name: 'Gemini 1.5 Flash 8B',
  type: 'chat',
  family: 'gemini-1.5',
  status: 'deprecated',
  description: 'Smallest and fastest Gemini 1.5',
  aliases: ['gemini-1.5-flash-8b-latest'],
  releaseDate: '2024-10-03',
  deprecationDate: '2025-09-01',
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
    },
  },
  pricing: {
    standard: {
      input: 0.0375,
      output: 0.15,
    },
    contextTiers: [
      {
        upTo: 128_000,
        pricing: {
          input: 0.0375,
          output: 0.15,
          cachedInput: 0.01,
        },
      },
      {
        upTo: 'unlimited',
        pricing: {
          input: 0.075,
          output: 0.3,
          cachedInput: 0.02,
        },
      },
    ],
    promptCaching: {
      write: 0,
      read: 0.01,
    },
  },
  capabilities: {
    streaming: true,
    functionCalling: true,
    structuredOutput: true,
    systemPrompt: true,
  },
  features: {
    batchApi: true,
    promptCaching: true,
  },
  rateLimits: {
    free: {
      rpm: 15,
      tpm: 250_000,
      rpd: 50,
    },
    tier1: {
      rpm: 4000,
      tpm: 4_000_000,
    },
    tier2: {
      rpm: 4000,
      tpm: 4_000_000,
    },
    tier3: {
      rpm: 4000,
      tpm: 4_000_000,
    },
  },
}));

export default gemini_1_5_flash_8b;
