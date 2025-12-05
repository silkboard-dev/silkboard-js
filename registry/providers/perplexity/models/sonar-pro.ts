/**
 * Sonar Pro
 * 
 * Advanced search model with grounding, supporting complex queries and follow-ups. Delivers deeper content understanding with enhanced search result accuracy and 2x more search results than standard Sonar.
 * 
 * @see {@link https://platform.perplexity.com/docs}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withPerplexityDefaults } from '../_defaults';

const sonar_pro: ModelDefinition = withPerplexityDefaults(defineModel({
  id: 'sonar-pro',
  name: 'Sonar Pro',
  type: 'chat',
  family: 'sonar',
  status: 'ga',
  description: 'Advanced search model with grounding, supporting complex queries and follow-ups. Delivers deeper content understanding with enhanced search result accuracy and 2x more search results than standard Sonar.',
  releaseDate: '2025-01-01',
  contextWindow: {
    input: 200_000,
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
      input: 3,
      output: 15,
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
    proSearch: true,
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

export default sonar_pro;
