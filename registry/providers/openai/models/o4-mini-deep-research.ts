/**
 * O4 Mini Deep Research
 * 
 * O4 mini variant optimized for deep research tool calls
 * 
 * @see {@link https://platform.openai.com/docs}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withOpenaiDefaults } from '../_defaults';

const o4_mini_deep_research: ModelDefinition = withOpenaiDefaults(defineModel({
  id: 'o4-mini-deep-research',
  name: 'O4 Mini Deep Research',
  type: 'reasoning',
  family: 'o4',
  status: 'preview',
  description: 'O4 mini variant optimized for deep research tool calls',
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
      input: 2,
      output: 8,
      cachedInput: 0.5,
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

export default o4_mini_deep_research;
