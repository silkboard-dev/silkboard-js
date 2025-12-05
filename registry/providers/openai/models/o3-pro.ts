/**
 * O3 Pro
 * 
 * Extended-thinking O3 model
 * 
 * @see {@link https://platform.openai.com/docs}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withOpenaiDefaults } from '../_defaults';

const o3_pro: ModelDefinition = withOpenaiDefaults(defineModel({
  id: 'o3-pro',
  name: 'O3 Pro',
  type: 'reasoning',
  family: 'o3',
  status: 'ga',
  description: 'Extended-thinking O3 model',
  architecture: {
    trainingCutoff: '2024-06-01',
  },
  contextWindow: {
    input: 0,
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
      input: 20,
      output: 80,
    },
  },
  capabilities: {
    streaming: true,
    structuredOutput: true,
  },
  features: {
    promptCaching: true,
    batchApi: true,
    assistantsApi: true,
  },
  reasoning: {
    supported: true,
    type: 'reasoning_effort',
  },
}));

export default o3_pro;
