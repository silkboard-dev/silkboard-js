/**
 * Sonar Reasoning
 * 
 * Fast, real-time reasoning model designed for problem-solving with search. Applies Chain-of-Thought (CoT) reasoning for quick problem-solving and structured analysis with real-time web search.
 * 
 * @see {@link https://platform.perplexity.com/docs}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withPerplexityDefaults } from '../_defaults';

const sonar_reasoning: ModelDefinition = withPerplexityDefaults(defineModel({
  id: 'sonar-reasoning',
  name: 'Sonar Reasoning',
  type: 'chat',
  family: 'sonar-reasoning',
  status: 'ga',
  description: 'Fast, real-time reasoning model designed for problem-solving with search. Applies Chain-of-Thought (CoT) reasoning for quick problem-solving and structured analysis with real-time web search.',
  releaseDate: '2025-01-01',
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
      output: 5,
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
  reasoning: {
    supported: true,
    type: 'native',
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

export default sonar_reasoning;
