/**
 * Cloudflare Workers AI Provider
 * 
 * @see {@link https://developers.cloudflare.com/workers-ai/}
 */

import { defineProvider } from '../../base';
import type { ProviderDefinition, ModelDefinition } from '../../types';

import _cf_meta_llama_3_1_8b_instruct_fast from './models/_cf_meta_llama-3.1-8b-instruct-fast';
import _cf_meta_llama_3_1_8b_instruct_fp8 from './models/_cf_meta_llama-3.1-8b-instruct-fp8';
import _cf_meta_llama_3_3_70b_instruct_fp8_fast from './models/_cf_meta_llama-3.3-70b-instruct-fp8-fast';
import _cf_meta_llama_4_scout_17b_16e_instruct from './models/_cf_meta_llama-4-scout-17b-16e-instruct';

/** All Cloudflare Workers AI models */
export const models: Record<string, ModelDefinition> = {
  '@cf/meta/llama-3.1-8b-instruct-fast': _cf_meta_llama_3_1_8b_instruct_fast,
  '@cf/meta/llama-3.1-8b-instruct-fp8': _cf_meta_llama_3_1_8b_instruct_fp8,
  '@cf/meta/llama-3.3-70b-instruct-fp8-fast': _cf_meta_llama_3_3_70b_instruct_fp8_fast,
  '@cf/meta/llama-4-scout-17b-16e-instruct': _cf_meta_llama_4_scout_17b_16e_instruct,
};

/** Cloudflare Workers AI provider definition */
export const provider: ProviderDefinition = defineProvider({
  ...{
  id: 'cloudflare',
  name: 'Cloudflare Workers AI',
  category: 'cloud',
  apiFormat: 'openai-completions',
  baseUrl: 'https://api.cloudflare.com/client/v4/accounts/{account_id}/ai/run/{model_name}',
  docsUrl: 'https://developers.cloudflare.com/workers-ai/',
  pricingUrl: 'https://developers.cloudflare.com/workers-ai/platform/pricing/',
  statusUrl: 'https://www.cloudflarestatus.com/',
  auth: {
    type: 'bearer',
    header: 'Authorization',
    prefix: 'Bearer ',
    envVar: 'CLOUDFLARE_API_TOKEN',
  },
},
  models,
});

export default provider;

// Re-export individual models
export {
  _cf_meta_llama_3_1_8b_instruct_fast,
  _cf_meta_llama_3_1_8b_instruct_fp8,
  _cf_meta_llama_3_3_70b_instruct_fp8_fast,
  _cf_meta_llama_4_scout_17b_16e_instruct,
};

// Re-export defaults for external use
export * from './_defaults';
