/**
 * xAI Provider
 * 
 * @see {@link https://docs.x.ai/}
 */

import { defineProvider } from '../../base';
import type { ProviderDefinition, ModelDefinition } from '../../types';

import grok_4_1_fast_reasoning from './models/grok-4-1-fast-reasoning';
import grok_4_1_fast_non_reasoning from './models/grok-4-1-fast-non-reasoning';
import grok_4_fast_reasoning from './models/grok-4-fast-reasoning';
import grok_4_fast_non_reasoning from './models/grok-4-fast-non-reasoning';
import grok_4 from './models/grok-4';
import grok_code_fast_1 from './models/grok-code-fast-1';
import grok_3 from './models/grok-3';
import grok_3_mini from './models/grok-3-mini';
import grok_2_1212 from './models/grok-2-1212';
import grok_2_vision_1212 from './models/grok-2-vision-1212';
import grok_2_image_1212 from './models/grok-2-image-1212';
import grok_beta from './models/grok-beta';
import grok_vision_beta from './models/grok-vision-beta';

/** All xAI models */
export const models: Record<string, ModelDefinition> = {
  'grok-4-1-fast-reasoning': grok_4_1_fast_reasoning,
  'grok-4-1-fast-non-reasoning': grok_4_1_fast_non_reasoning,
  'grok-4-fast-reasoning': grok_4_fast_reasoning,
  'grok-4-fast-non-reasoning': grok_4_fast_non_reasoning,
  'grok-4': grok_4,
  'grok-code-fast-1': grok_code_fast_1,
  'grok-3': grok_3,
  'grok-3-mini': grok_3_mini,
  'grok-2-1212': grok_2_1212,
  'grok-2-vision-1212': grok_2_vision_1212,
  'grok-2-image-1212': grok_2_image_1212,
  'grok-beta': grok_beta,
  'grok-vision-beta': grok_vision_beta,
};

/** xAI provider definition */
export const provider: ProviderDefinition = defineProvider({
  ...{
  id: 'xai',
  name: 'xAI',
  category: 'official',
  apiFormat: 'openai-completions',
  baseUrl: 'https://api.x.ai/v1',
  docsUrl: 'https://docs.x.ai/',
  pricingUrl: 'https://docs.x.ai/docs/models',
  statusUrl: 'https://status.x.ai/',
  auth: {
    type: 'api_key',
    header: 'Authorization',
    prefix: 'Bearer ',
    envVar: 'XAI_API_KEY',
  },
},
  models,
});

export default provider;

// Re-export individual models
export {
  grok_4_1_fast_reasoning,
  grok_4_1_fast_non_reasoning,
  grok_4_fast_reasoning,
  grok_4_fast_non_reasoning,
  grok_4,
  grok_code_fast_1,
  grok_3,
  grok_3_mini,
  grok_2_1212,
  grok_2_vision_1212,
  grok_2_image_1212,
  grok_beta,
  grok_vision_beta,
};

// Re-export defaults for external use
export * from './_defaults';
