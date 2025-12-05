/**
 * Gemini 2.5 Flash Preview
 * 
 * Latest preview model based on 2.5 Flash for large scale processing, low-latency, and agentic use cases
 * 
 * @see {@link https://platform.google.com/docs}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withGoogleDefaults } from '../_defaults';

const gemini_2_5_flash_preview_09_2025: ModelDefinition = withGoogleDefaults(defineModel({
  id: 'gemini-2.5-flash-preview-09-2025',
  name: 'Gemini 2.5 Flash Preview',
  type: 'chat',
  family: 'gemini-2.5',
  status: 'preview',
  description: 'Latest preview model based on 2.5 Flash for large scale processing, low-latency, and agentic use cases',
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
      input: 0.15,
      output: 0.6,
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
  },
}));

export default gemini_2_5_flash_preview_09_2025;
