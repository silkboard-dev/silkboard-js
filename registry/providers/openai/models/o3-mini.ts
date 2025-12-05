/**
 * O3 Mini
 * 
 * Compact reasoning model with long context
 * 
 * @see {@link https://platform.openai.com/docs}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withOpenaiDefaults } from '../_defaults';

const o3_mini: ModelDefinition = withOpenaiDefaults(defineModel({
  id: 'o3-mini',
  name: 'O3 Mini',
  type: 'reasoning',
  family: 'o3',
  status: 'ga',
  description: 'Compact reasoning model with long context',
  aliases: ['o3-mini-2025-01-31'],
  releaseDate: '2025-01-31',
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
    },
    output: {
      text: true,
    },
  },
  pricing: {
    standard: {
      input: 1.1,
      output: 4.4,
      cachedInput: 0.55,
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
    assistantsApi: true,
  },
  reasoning: {
    supported: true,
    type: 'reasoning_effort',
    effortLevels: ['low', 'medium', 'high'],
  },
}));

export default o3_mini;
