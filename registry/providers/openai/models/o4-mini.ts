/**
 * O4 Mini
 * 
 * Fast, cost-efficient reasoning model (predecessor to GPT-5 mini)
 * 
 * @see {@link https://platform.openai.com/docs}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withOpenaiDefaults } from '../_defaults';

const o4_mini: ModelDefinition = withOpenaiDefaults(defineModel({
  id: 'o4-mini',
  name: 'O4 Mini',
  type: 'reasoning',
  family: 'o4',
  status: 'ga',
  description: 'Fast, cost-efficient reasoning model (predecessor to GPT-5 mini)',
  releaseDate: '2025-04-16',
  architecture: {
    trainingCutoff: '2024-06-01',
  },
  contextWindow: {
    input: 200_000,
    output: 100_000,
  },
  modalities: {
    input: {
      text: true,
      image: true,
    },
    output: {
      text: true,
    },
  },
  pricing: {
    standard: {
      input: 1.1,
      output: 4.4,
      cachedInput: 0.28,
    },
    batch: {
      input: 0.55,
      output: 2.2,
      discountPercent: 50,
    },
  },
  capabilities: {
    streaming: true,
    functionCalling: true,
    structuredOutput: true,
    systemPrompt: true,
  },
  features: {
    webSearch: true,
    promptCaching: true,
    batchApi: true,
  },
  reasoning: {
    supported: true,
    type: 'reasoning_effort',
    effortLevels: ['low', 'medium', 'high'],
  },
}));

export default o4_mini;
