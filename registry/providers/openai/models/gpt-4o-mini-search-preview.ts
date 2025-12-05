/**
 * GPT-4o Mini Search Preview
 * 
 * Low-cost GPT-4o search preview model
 * 
 * @see {@link https://platform.openai.com/docs}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withOpenaiDefaults } from '../_defaults';

const gpt_4o_mini_search_preview: ModelDefinition = withOpenaiDefaults(defineModel({
  id: 'gpt-4o-mini-search-preview',
  name: 'GPT-4o Mini Search Preview',
  type: 'chat',
  family: 'gpt-4o',
  status: 'preview',
  description: 'Low-cost GPT-4o search preview model',
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
      input: 0.15,
      output: 0.6,
    },
  },
  capabilities: {},
  features: {
    webSearch: true,
    batchApi: true,
    assistantsApi: true,
  },
}));

export default gpt_4o_mini_search_preview;
