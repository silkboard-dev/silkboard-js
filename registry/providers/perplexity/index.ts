/**
 * Perplexity Provider
 * 
 * @see {@link https://docs.perplexity.ai/}
 */

import { defineProvider } from '../../base';
import type { ProviderDefinition, ModelDefinition } from '../../types';

import sonar from './models/sonar';
import sonar_pro from './models/sonar-pro';
import sonar_reasoning from './models/sonar-reasoning';
import sonar_reasoning_pro from './models/sonar-reasoning-pro';
import sonar_deep_research from './models/sonar-deep-research';
import search_api from './models/search-api';

/** All Perplexity models */
export const models: Record<string, ModelDefinition> = {
  'sonar': sonar,
  'sonar-pro': sonar_pro,
  'sonar-reasoning': sonar_reasoning,
  'sonar-reasoning-pro': sonar_reasoning_pro,
  'sonar-deep-research': sonar_deep_research,
  'search-api': search_api,
};

/** Perplexity provider definition */
export const provider: ProviderDefinition = defineProvider({
  ...{
  id: 'perplexity',
  name: 'Perplexity',
  category: 'official',
  apiFormat: 'openai-completions',
  baseUrl: 'https://api.perplexity.ai',
  docsUrl: 'https://docs.perplexity.ai/',
  pricingUrl: 'https://docs.perplexity.ai/getting-started/pricing',
  statusUrl: 'https://docs.perplexity.ai/status/status',
  auth: {
    type: 'api_key',
    header: 'Authorization',
    prefix: 'Bearer ',
    envVar: 'PERPLEXITY_API_KEY',
  },
},
  models,
});

export default provider;

// Re-export individual models
export {
  sonar,
  sonar_pro,
  sonar_reasoning,
  sonar_reasoning_pro,
  sonar_deep_research,
  search_api,
};

// Re-export defaults for external use
export * from './_defaults';
