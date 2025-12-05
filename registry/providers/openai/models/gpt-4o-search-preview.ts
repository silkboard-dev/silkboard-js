/**
 * GPT-4o Search Preview
 * 
 * GPT-4o with built-in search preview tooling
 * 
 * @see {@link https://platform.openai.com/docs}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withOpenaiDefaults } from '../_defaults';

const gpt_4o_search_preview: ModelDefinition = withOpenaiDefaults(defineModel({
  id: 'gpt-4o-search-preview',
  name: 'GPT-4o Search Preview',
  type: 'chat',
  family: 'gpt-4o',
  status: 'preview',
  description: 'GPT-4o with built-in search preview tooling',
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
      input: 2.5,
      output: 10,
    },
  },
  capabilities: {},
  features: {
    webSearch: true,
    batchApi: true,
    assistantsApi: true,
  },
}));

export default gpt_4o_search_preview;
