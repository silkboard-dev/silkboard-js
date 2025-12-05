/**
 * Gemini 2.5 Flash-Lite
 * 
 * Fastest flash model optimized for cost-efficiency and high throughput
 * 
 * @see {@link https://platform.google.com/docs}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withGoogleDefaults } from '../_defaults';

const gemini_2_5_flash_lite: ModelDefinition = withGoogleDefaults(defineModel({
  id: 'gemini-2.5-flash-lite',
  name: 'Gemini 2.5 Flash-Lite',
  type: 'chat',
  family: 'gemini-2.5',
  status: 'ga',
  description: 'Fastest flash model optimized for cost-efficiency and high throughput',
  releaseDate: '2025-09-01',
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
      input: 0.075,
      output: 0.3,
    },
    batch: {
      input: 0.0375,
      output: 0.15,
      discountPercent: 50,
    },
    contextTiers: [
      {
        upTo: 200_000,
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
          output: 0.45,
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
      rpm: 15,
      tpm: 250_000,
      rpd: 1000,
    },
    tier1: {
      rpm: 4000,
      tpm: 4_000_000,
      rpd: 10_000,
    },
    tier2: {
      rpm: 6000,
      tpm: 10_000_000,
      rpd: 100_000,
    },
    tier3: {
      rpm: 30_000,
      tpm: 30_000_000,
    },
  },
}));

export default gemini_2_5_flash_lite;
