/**
 * Sonar Reasoning Pro
 * 
 * Precise reasoning offering powered by DeepSeek-R1 with Chain of Thought (CoT). High-performance reasoning model leveraging advanced multi-step Chain-of-Thought reasoning and enhanced information retrieval for complex problem-solving.
 * 
 * @see {@link https://platform.perplexity.com/docs}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withPerplexityDefaults } from '../_defaults';

const sonar_reasoning_pro: ModelDefinition = withPerplexityDefaults(defineModel({
  id: 'sonar-reasoning-pro',
  name: 'Sonar Reasoning Pro',
  type: 'chat',
  family: 'sonar-reasoning',
  status: 'ga',
  description: 'Precise reasoning offering powered by DeepSeek-R1 with Chain of Thought (CoT). High-performance reasoning model leveraging advanced multi-step Chain-of-Thought reasoning and enhanced information retrieval for complex problem-solving.',
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
      input: 2,
      output: 8,
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

export default sonar_reasoning_pro;
