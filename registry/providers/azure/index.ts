/**
 * Azure OpenAI Provider
 * 
 * @see {@link https://learn.microsoft.com/en-us/azure/ai-services/openai/}
 */

import { defineProvider } from '../../base';
import type { ProviderDefinition, ModelDefinition } from '../../types';

import gpt_4o from './models/gpt-4o';

/** All Azure OpenAI models */
export const models: Record<string, ModelDefinition> = {
  'gpt-4o': gpt_4o,
};

/** Azure OpenAI provider definition */
export const provider: ProviderDefinition = defineProvider({
  ...{
  id: 'azure',
  name: 'Azure OpenAI',
  category: 'cloud',
  apiFormat: 'azure',
  baseUrl: 'https://{resource}.openai.azure.com/openai/deployments/{deployment}',
  docsUrl: 'https://learn.microsoft.com/en-us/azure/ai-services/openai/',
  pricingUrl: 'https://azure.microsoft.com/en-us/pricing/details/cognitive-services/openai-service/',
  auth: {
    type: 'api_key',
    header: 'api-key',
    envVar: 'AZURE_OPENAI_API_KEY',
  },
},
  models,
});

export default provider;

// Re-export individual models
export {
  gpt_4o,
};

// Re-export defaults for external use
export * from './_defaults';
