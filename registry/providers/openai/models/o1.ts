/**
 * O1
 * 
 * Reasoning model with effort controls
 * 
 * @see {@link https://platform.openai.com/docs}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withOpenaiDefaults } from '../_defaults';

const o1: ModelDefinition = withOpenaiDefaults(defineModel({
  id: 'o1',
  name: 'O1',
  type: 'reasoning',
  family: 'o1',
  status: 'ga',
  description: 'Reasoning model with effort controls',
  aliases: ['o1-2024-12-17'],
  releaseDate: '2024-12-17',
  architecture: {
    trainingCutoff: '2023-10-01',
  },
  contextWindow: {
    input: 200_000,
    output: 100_000,
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
      input: 15,
      output: 60,
      cachedInput: 7.5,
    },
  },
  capabilities: {
    streaming: true,
    systemPrompt: true,
    seed: true,
  },
  features: {
    fileSearch: true,
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

export default o1;
