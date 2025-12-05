/**
 * O1 Pro
 * 
 * Higher budget O1 variant
 * 
 * @see {@link https://platform.openai.com/docs}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withOpenaiDefaults } from '../_defaults';

const o1_pro: ModelDefinition = withOpenaiDefaults(defineModel({
  id: 'o1-pro',
  name: 'O1 Pro',
  type: 'reasoning',
  family: 'o1',
  status: 'ga',
  description: 'Higher budget O1 variant',
  architecture: {
    trainingCutoff: '2023-10-01',
  },
  contextWindow: {
    input: 0,
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
      input: 150,
      output: 600,
    },
  },
  capabilities: {},
  features: {
    batchApi: true,
    assistantsApi: true,
  },
  reasoning: {
    supported: true,
    type: 'reasoning_effort',
  },
}));

export default o1_pro;
