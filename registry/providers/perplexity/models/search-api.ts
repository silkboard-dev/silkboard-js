/**
 * Search API
 * 
 * Raw web search results with advanced filtering. Provides direct access to search results without LLM processing from Perplexity's continuously refreshed index.
 * 
 * @see {@link https://platform.perplexity.com/docs}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withPerplexityDefaults } from '../_defaults';

const search_api: ModelDefinition = withPerplexityDefaults(defineModel({
  id: 'search-api',
  name: 'Search API',
  type: 'search',
  family: 'search',
  status: 'ga',
  description: 'Raw web search results with advanced filtering. Provides direct access to search results without LLM processing from Perplexity\'s continuously refreshed index.',
  releaseDate: '2025-09-01',
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
      input: 0,
    },
    unit: {
      perRequest: 5,
    },
  },
  capabilities: {
    streaming: false,
  },
  features: {
    webSearch: true,
    domainFiltering: true,
    dateFiltering: true,
    locationFiltering: true,
  },
  rateLimits: {
    allTiers: {
      rps: 3,
    },
  },
}));

export default search_api;
