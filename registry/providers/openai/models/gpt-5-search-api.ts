/**
 * GPT-5 Search API
 * 
 * GPT-5 with integrated search tooling
 * 
 * @see {@link https://platform.openai.com/docs}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withOpenaiDefaults } from '../_defaults';

const gpt_5_search_api: ModelDefinition = withOpenaiDefaults(defineModel({
  id: 'gpt-5-search-api',
  name: 'GPT-5 Search API',
  type: 'chat',
  family: 'gpt-5',
  status: 'preview',
  description: 'GPT-5 with integrated search tooling',
  architecture: {},
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
      input: 1.25,
      output: 10,
      cachedInput: 0.125,
    },
  },
  capabilities: {},
  features: {
    webSearch: true,
    batchApi: true,
    assistantsApi: true,
  },
}));

export default gpt_5_search_api;
