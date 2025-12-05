/**
 * Gemini 1.5 Flash
 * 
 * Fast and efficient Gemini 1.5 with 1M token context
 * 
 * @see {@link https://platform.google.com/docs}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withGoogleDefaults } from '../_defaults';

const gemini_1_5_flash: ModelDefinition = withGoogleDefaults(defineModel({
  id: 'gemini-1.5-flash',
  name: 'Gemini 1.5 Flash',
  type: 'chat',
  family: 'gemini-1.5',
  status: 'deprecated',
  description: 'Fast and efficient Gemini 1.5 with 1M token context',
  aliases: ['gemini-1.5-flash-latest', 'gemini-1.5-flash-002'],
  releaseDate: '2024-05-14',
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
      file: true,
    },
    output: {
      text: true,
    },
  },
  pricing: {
    standard: {
      input: 0.075,
      output: 0.3,
    },
    contextTiers: [
      {
        upTo: 128_000,
        pricing: {
          input: 0.075,
          output: 0.3,
          cachedInput: 0.01875,
        },
      },
      {
        upTo: 'unlimited',
        pricing: {
          input: 0.15,
          output: 0.6,
          cachedInput: 0.0375,
        },
      },
    ],
    promptCaching: {
      write: 0,
      read: 0.01875,
    },
  },
  capabilities: {
    streaming: true,
    functionCalling: true,
    structuredOutput: true,
    systemPrompt: true,
    jsonMode: true,
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
      rpm: 2000,
      tpm: 4_000_000,
    },
    tier2: {
      rpm: 2000,
      tpm: 4_000_000,
    },
    tier3: {
      rpm: 2000,
      tpm: 4_000_000,
    },
  },
}));

export default gemini_1_5_flash;
