/**
 * Sonar
 * 
 * Lightweight, cost-effective search model with grounding. Built on Llama 3.3 70B, optimized for quick, grounded answers with real-time web search.
 * 
 * @see {@link https://platform.perplexity.com/docs}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withPerplexityDefaults } from '../_defaults';

const sonar: ModelDefinition = withPerplexityDefaults(defineModel({
  id: 'sonar',
  name: 'Sonar',
  type: 'chat',
  family: 'sonar',
  status: 'ga',
  description: 'Lightweight, cost-effective search model with grounding. Built on Llama 3.3 70B, optimized for quick, grounded answers with real-time web search.',
  releaseDate: '2025-02-11',
  contextWindow: {
    input: 128_000,
    output: 8192,
  },
  modalities: {
    input: {
      text: true,
      image: true,
      file: true,
    },
    output: {
      text: true,
    },
  },
  pricing: {
    standard: {
      input: 1,
      output: 1,
    },
  },
  capabilities: {
    streaming: true,
    structuredOutput: true,
    jsonMode: true,
    systemPrompt: true,
    stopSequences: true,
  },
  features: {
    webSearch: true,
    imageInput: true,
    fileAttachments: true,
  },
  rateLimits: {
    tier_0: {
      rpm: 50,
    },
    tier_1: {
      rpm: 50,
    },
    tier_2: {
      rpm: 100,
    },
    tier_3: {
      rpm: 200,
    },
    tier_4: {
      rpm: 500,
    },
    tier_5: {
      rpm: 1000,
    },
  },
}));

export default sonar;
