/**
 * Gemini 3 Pro Preview
 * 
 * Best model for multimodal understanding, most powerful agentic and vibe-coding model with state-of-the-art reasoning
 * 
 * @see {@link https://platform.google.com/docs}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withGoogleDefaults } from '../_defaults';

const gemini_3_pro_preview: ModelDefinition = withGoogleDefaults(defineModel({
  id: 'gemini-3-pro-preview',
  name: 'Gemini 3 Pro Preview',
  type: 'chat',
  family: 'gemini-3',
  status: 'preview',
  description: 'Best model for multimodal understanding, most powerful agentic and vibe-coding model with state-of-the-art reasoning',
  releaseDate: '2025-11-18',
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
      input: 2,
      output: 12,
    },
    batch: {
      input: 1,
      output: 6,
      discountPercent: 50,
    },
    contextTiers: [
      {
        upTo: 200_000,
        pricing: {
          input: 2,
          output: 12,
          cachedInput: 0.2,
        },
      },
      {
        upTo: 'unlimited',
        pricing: {
          input: 4,
          output: 18,
          cachedInput: 0.4,
        },
      },
    ],
    promptCaching: {
      write: 0,
      read: 0.2,
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
  },
  reasoning: {
    supported: true,
    type: 'thinking',
  },
  rateLimits: {
    free: {
      rpm: undefined,
      tpm: undefined,
      rpd: undefined,
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

export default gemini_3_pro_preview;
