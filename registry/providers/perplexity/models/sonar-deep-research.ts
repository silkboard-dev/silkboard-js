/**
 * Sonar Deep Research
 * 
 * Expert-level research model conducting exhaustive searches and generating comprehensive reports. Capable of conducting exhaustive searches across hundreds of sources, synthesizing expert-level insights, and generating detailed reports with comprehensive analysis.
 * 
 * @see {@link https://platform.perplexity.com/docs}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withPerplexityDefaults } from '../_defaults';

const sonar_deep_research: ModelDefinition = withPerplexityDefaults(defineModel({
  id: 'sonar-deep-research',
  name: 'Sonar Deep Research',
  type: 'chat',
  family: 'sonar-research',
  status: 'ga',
  description: 'Expert-level research model conducting exhaustive searches and generating comprehensive reports. Capable of conducting exhaustive searches across hundreds of sources, synthesizing expert-level insights, and generating detailed reports with comprehensive analysis.',
  releaseDate: '2025-01-01',
  contextWindow: {
    input: 128_000,
    output: 8192,
  },
  modalities: {
    input: {
      text: true,
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
    systemPrompt: true,
    stopSequences: true,
  },
  features: {
    webSearch: true,
    deepResearch: true,
    fileAttachments: true,
    asyncApi: true,
  },
  reasoning: {
    supported: true,
    type: 'reasoning_effort',
    effortLevels: ['low', 'medium', 'high'],
  },
  rateLimits: {
    tier_0: {
      rpm: 5,
    },
    tier_1: {
      rpm: 5,
    },
    tier_2: {
      rpm: 10,
    },
    tier_3: {
      rpm: 20,
    },
    tier_4: {
      rpm: 50,
    },
    tier_5: {
      rpm: 100,
    },
  },
}));

export default sonar_deep_research;
