/**
 * Gemini 2.5 Flash-Lite Preview
 * 
 * Latest preview model based on Flash-Lite optimized for cost-efficiency and high quality
 * 
 * @see {@link https://platform.google.com/docs}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withGoogleDefaults } from '../_defaults';

const gemini_2_5_flash_lite_preview_09_2025: ModelDefinition = withGoogleDefaults(defineModel({
  id: 'gemini-2.5-flash-lite-preview-09-2025',
  name: 'Gemini 2.5 Flash-Lite Preview',
  type: 'chat',
  family: 'gemini-2.5',
  status: 'preview',
  description: 'Latest preview model based on Flash-Lite optimized for cost-efficiency and high quality',
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
    contextTiers: [
      {
        upTo: 200_000,
        pricing: {
          input: 0.075,
          output: 0.3,
        },
      },
      {
        upTo: 'unlimited',
        pricing: {
          input: 0.15,
          output: 0.45,
        },
      },
    ],
  },
  capabilities: {
    streaming: true,
    functionCalling: true,
    structuredOutput: true,
    systemPrompt: true,
  },
  features: {
    webSearch: true,
    codeExecution: true,
    fileSearch: true,
    batchApi: true,
    promptCaching: true,
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
  },
}));

export default gemini_2_5_flash_lite_preview_09_2025;
