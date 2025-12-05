/**
 * O3
 * 
 * Reasoning model for complex tasks
 * 
 * @see {@link https://platform.openai.com/docs}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withOpenaiDefaults } from '../_defaults';

const o3: ModelDefinition = withOpenaiDefaults(defineModel({
  id: 'o3',
  name: 'O3',
  type: 'reasoning',
  family: 'o3',
  status: 'ga',
  description: 'Reasoning model for complex tasks',
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
      input: 2,
      output: 8,
      cachedInput: 0.5,
    },
    batch: {
      input: 1,
      output: 4,
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
    assistantsApi: true,
  },
  reasoning: {
    supported: true,
    type: 'reasoning_effort',
    effortLevels: ['low', 'medium', 'high'],
  },
}));

export default o3;
