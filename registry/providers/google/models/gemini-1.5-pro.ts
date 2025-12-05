/**
 * Gemini 1.5 Pro
 * 
 * Most capable Gemini 1.5 model with 2M token context
 * 
 * @see {@link https://platform.google.com/docs}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withGoogleDefaults } from '../_defaults';

const gemini_1_5_pro: ModelDefinition = withGoogleDefaults(defineModel({
  id: 'gemini-1.5-pro',
  name: 'Gemini 1.5 Pro',
  type: 'chat',
  family: 'gemini-1.5',
  status: 'deprecated',
  description: 'Most capable Gemini 1.5 model with 2M token context',
  aliases: ['gemini-1.5-pro-latest', 'gemini-1.5-pro-002'],
  releaseDate: '2024-02-15',
  deprecationDate: '2025-09-01',
  contextWindow: {
    input: 2_097_152,
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
      input: 1.25,
      output: 5,
    },
    contextTiers: [
      {
        upTo: 128_000,
        pricing: {
          input: 1.25,
          output: 5,
          cachedInput: 0.3125,
        },
      },
      {
        upTo: 'unlimited',
        pricing: {
          input: 2.5,
          output: 10,
          cachedInput: 0.625,
        },
      },
    ],
    promptCaching: {
      write: 0,
      read: 0.3125,
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
    tier1: {
      rpm: 1000,
      tpm: 4_000_000,
    },
    tier2: {
      rpm: 1000,
      tpm: 4_000_000,
    },
    tier3: {
      rpm: 1000,
      tpm: 4_000_000,
    },
  },
}));

export default gemini_1_5_pro;
