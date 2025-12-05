/**
 * Gemini 2.5 Pro
 * 
 * State-of-the-art thinking model for complex problems in code, math, STEM, and long context analysis
 * 
 * @see {@link https://platform.google.com/docs}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withGoogleDefaults } from '../_defaults';

const gemini_2_5_pro: ModelDefinition = withGoogleDefaults(defineModel({
  id: 'gemini-2.5-pro',
  name: 'Gemini 2.5 Pro',
  type: 'chat',
  family: 'gemini-2.5',
  status: 'ga',
  description: 'State-of-the-art thinking model for complex problems in code, math, STEM, and long context analysis',
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
      input: 1.25,
      output: 10,
    },
    batch: {
      input: 0.625,
      output: 5,
      discountPercent: 50,
    },
    contextTiers: [
      {
        upTo: 200_000,
        pricing: {
          input: 1.25,
          output: 10,
          cachedInput: 0.3125,
        },
      },
      {
        upTo: 'unlimited',
        pricing: {
          input: 2.5,
          output: 15,
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
    type: 'thinking',
  },
  rateLimits: {
    free: {
      rpm: 2,
      tpm: 125_000,
      rpd: 50,
    },
    tier1: {
      rpm: 150,
      tpm: 2_000_000,
      rpd: 1000,
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

export default gemini_2_5_pro;
