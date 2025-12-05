/**
 * DeepSeek Provider
 * 
 * @see {@link https://api-docs.deepseek.com/}
 */

import { defineProvider } from '../../base';
import type { ProviderDefinition, ModelDefinition } from '../../types';

import deepseek_chat from './models/deepseek-chat';
import deepseek_reasoner from './models/deepseek-reasoner';

/** All DeepSeek models */
export const models: Record<string, ModelDefinition> = {
  'deepseek-chat': deepseek_chat,
  'deepseek-reasoner': deepseek_reasoner,
};

/** DeepSeek provider definition */
export const provider: ProviderDefinition = defineProvider({
  id: 'deepseek',
  name: 'DeepSeek',
  category: 'official',
  apiFormat: 'openai-completions',
  baseUrl: 'https://api.deepseek.com',
  docsUrl: 'https://api-docs.deepseek.com/',
  pricingUrl: 'https://api-docs.deepseek.com/quick_start/pricing',
  statusUrl: 'https://status.deepseek.com/',
  auth: {
    type: 'api_key',
    header: 'Authorization',
    prefix: 'Bearer ',
    envVar: 'DEEPSEEK_API_KEY',
  },
  models,
});

export default provider;

// Re-export individual models
export {
  deepseek_chat,
  deepseek_reasoner,
};

// Re-export defaults for external use
export * from './_defaults';
