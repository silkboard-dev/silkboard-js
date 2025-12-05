/**
 * Gemini 2.0 Flash
 * 
 * Second generation workhorse model with 1M token context, native tool use, and multimodal capabilities
 * 
 * @see {@link https://platform.google.com/docs}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withGoogleDefaults } from '../_defaults';

const gemini_2_0_flash: ModelDefinition = withGoogleDefaults(defineModel({
  id: 'gemini-2.0-flash',
  name: 'Gemini 2.0 Flash',
  type: 'chat',
  family: 'gemini-2.0',
  status: 'ga',
  description: 'Second generation workhorse model with 1M token context, native tool use, and multimodal capabilities',
  releaseDate: '2024-12-11',
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
      input: 0.1,
      output: 0.4,
    },
    batch: {
      input: 0.05,
      output: 0.2,
      discountPercent: 50,
    },
    promptCaching: {
      write: 0,
      read: 0.025,
    },
    modality: {
      text: {
        input: 0.1,
        output: 0.4,
        cachedInput: 0.025,
      },
      audio: {
        input: 0.7,
        cachedInput: 0.175,
      },
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
    googleMaps: true,
    batchApi: true,
    promptCaching: true,
    liveApi: true,
  },
  reasoning: {
    supported: true,
    type: 'experimental',
  },
  rateLimits: {
    free: {
      rpm: 15,
      tpm: 1_000_000,
      rpd: 200,
    },
    tier1: {
      rpm: 2000,
      tpm: 4_000_000,
      rpd: 10_000,
    },
    tier2: {
      rpm: 2000,
      tpm: 4_000_000,
      rpd: 10_000,
    },
    tier3: {
      rpm: 2000,
      tpm: 4_000_000,
    },
  },
}));

export default gemini_2_0_flash;
