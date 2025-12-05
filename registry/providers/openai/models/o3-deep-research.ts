/**
 * O3 Deep Research
 * 
 * O3 model configured for deep research workflows
 * 
 * @see {@link https://platform.openai.com/docs}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withOpenaiDefaults } from '../_defaults';

const o3_deep_research: ModelDefinition = withOpenaiDefaults(defineModel({
  id: 'o3-deep-research',
  name: 'O3 Deep Research',
  type: 'reasoning',
  family: 'o3',
  status: 'preview',
  description: 'O3 model configured for deep research workflows',
  architecture: {
    trainingCutoff: '2024-06-01',
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
      input: 10,
      output: 40,
      cachedInput: 2.5,
    },
  },
  capabilities: {},
  features: {
    webSearch: true,
    batchApi: true,
    assistantsApi: true,
  },
  reasoning: {
    supported: true,
    type: 'reasoning_effort',
  },
}));

export default o3_deep_research;
