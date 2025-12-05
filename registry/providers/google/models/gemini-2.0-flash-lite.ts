/**
 * Gemini 2.0 Flash-Lite
 * 
 * Second generation small workhorse model optimized for cost efficiency and low latency
 * 
 * @see {@link https://platform.google.com/docs}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withGoogleDefaults } from '../_defaults';

const gemini_2_0_flash_lite: ModelDefinition = withGoogleDefaults(defineModel({
  id: 'gemini-2.0-flash-lite',
  name: 'Gemini 2.0 Flash-Lite',
  type: 'chat',
  family: 'gemini-2.0',
  status: 'ga',
  description: 'Second generation small workhorse model optimized for cost efficiency and low latency',
  releaseDate: '2025-02-01',
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
      input: 0.075,
      output: 0.3,
    },
    batch: {
      input: 0.0375,
      output: 0.15,
      discountPercent: 50,
    },
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
      rpm: 30,
      tpm: 1_000_000,
      rpd: 200,
    },
    tier1: {
      rpm: 4000,
      tpm: 4_000_000,
      rpd: 10_000,
    },
    tier2: {
      rpm: 4000,
      tpm: 4_000_000,
      rpd: 10_000,
    },
    tier3: {
      rpm: 4000,
      tpm: 4_000_000,
    },
  },
}));

export default gemini_2_0_flash_lite;
