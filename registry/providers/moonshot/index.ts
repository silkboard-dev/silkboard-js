/**
 * Moonshot AI Provider
 * 
 * @see {@link https://platform.moonshot.cn/docs}
 */

import { defineProvider } from '../../base';
import type { ProviderDefinition, ModelDefinition } from '../../types';

import moonshot_v1_8k from './models/moonshot-v1-8k';
import moonshot_v1_32k from './models/moonshot-v1-32k';
import moonshot_v1_128k from './models/moonshot-v1-128k';

/** All Moonshot AI models */
export const models: Record<string, ModelDefinition> = {
  'moonshot-v1-8k': moonshot_v1_8k,
  'moonshot-v1-32k': moonshot_v1_32k,
  'moonshot-v1-128k': moonshot_v1_128k,
};

/** Moonshot AI provider definition */
export const provider: ProviderDefinition = defineProvider({
  ...{
  id: 'moonshot',
  name: 'Moonshot AI',
  category: 'official',
  apiFormat: 'openai-completions',
  baseUrl: 'https://api.moonshot.cn/v1',
  docsUrl: 'https://platform.moonshot.cn/docs',
  pricingUrl: 'https://platform.moonshot.cn/docs/pricing',
},
  models,
});

export default provider;

// Re-export individual models
export {
  moonshot_v1_8k,
  moonshot_v1_32k,
  moonshot_v1_128k,
};

// Re-export defaults for external use
export * from './_defaults';
