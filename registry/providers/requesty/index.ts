/**
 * Requesty Provider
 * 
 * @see {@link https://docs.requesty.ai/}
 */

import { defineProvider } from '../../base';
import type { ProviderDefinition, ModelDefinition } from '../../types';

import gpt_4o from './models/gpt-4o';
import claude_3_5_sonnet from './models/claude-3-5-sonnet';

/** All Requesty models */
export const models: Record<string, ModelDefinition> = {
  'gpt-4o': gpt_4o,
  'claude-3-5-sonnet': claude_3_5_sonnet,
};

/** Requesty provider definition */
export const provider: ProviderDefinition = defineProvider({
  ...{
  id: 'requesty',
  name: 'Requesty',
  category: 'gateway',
  apiFormat: 'openai-completions',
  baseUrl: 'https://router.requesty.ai/v1',
  docsUrl: 'https://docs.requesty.ai/',
  pricingUrl: 'https://requesty.ai/pricing',
  auth: {
    type: 'bearer',
    header: 'Authorization',
    prefix: 'Bearer ',
    envVar: 'REQUESTY_API_KEY',
  },
},
  models,
});

export default provider;

// Re-export individual models
export {
  gpt_4o,
  claude_3_5_sonnet,
};

// Re-export defaults for external use
export * from './_defaults';
