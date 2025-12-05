/**
 * Gemini 2.5 Flash
 * 
 * Best price-performance model with hybrid reasoning, thinking budgets, and 1M token context
 * 
 * @see {@link https://platform.google.com/docs}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withGoogleDefaults } from '../_defaults';

const gemini_2_5_flash: ModelDefinition = withGoogleDefaults(defineModel({
  id: 'gemini-2.5-flash',
  name: 'Gemini 2.5 Flash',
  type: 'chat',
  family: 'gemini-2.5',
  status: 'ga',
  description: 'Best price-performance model with hybrid reasoning, thinking budgets, and 1M token context',
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
      file: true,
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
    batch: {
      input: 0.075,
      output: 0.3,
      discountPercent: 50,
    },
    contextTiers: [
      {
        upTo: 200_000,
        pricing: {
          input: 0.15,
          output: 0.6,
          cachedInput: 0.0375,
        },
      },
      {
        upTo: 'unlimited',
        pricing: {
          input: 0.3,
          output: 0.9,
          cachedInput: 0.075,
        },
      },
    ],
    promptCaching: {
      write: 0,
      read: 0.0375,
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
    webSearch: true,
    codeExecution: true,
    fileSearch: true,
    urlContext: true,
    batchApi: true,
    promptCaching: true,
    googleMaps: true,
  },
  reasoning: {
    supported: true,
    type: 'thinking_budget',
  },
  rateLimits: {
    free: {
      rpm: 10,
      tpm: 250_000,
      rpd: 250,
    },
    tier1: {
      rpm: 1000,
      tpm: 1_000_000,
      rpd: 10_000,
    },
    tier2: {
      rpm: 2000,
      tpm: 3_000_000,
      rpd: 100_000,
    },
    tier3: {
      rpm: 10_000,
      tpm: 8_000_000,
    },
  },
}));

export default gemini_2_5_flash;
