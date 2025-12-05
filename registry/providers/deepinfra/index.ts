/**
 * DeepInfra Provider
 *
 * @see {@link https://deepinfra.com/docs}
 */

import { defineProvider } from '../../base';
import type { ProviderDefinition, ModelDefinition } from '../../types';

import meta_llama_Llama_3_3_70B_Instruct from './models/meta-llama_Llama-3.3-70B-Instruct';
import meta_llama_Meta_Llama_3_1_70B_Instruct from './models/meta-llama_Meta-Llama-3.1-70B-Instruct';
import meta_llama_Meta_Llama_3_1_8B_Instruct from './models/meta-llama_Meta-Llama-3.1-8B-Instruct';
import deepseek_ai_DeepSeek_R1 from './models/deepseek-ai_DeepSeek-R1';
import deepseek_ai_DeepSeek_V3 from './models/deepseek-ai_DeepSeek-V3';
import Qwen_Qwen2_5_72B_Instruct from './models/Qwen_Qwen2.5-72B-Instruct';
import BAAI_bge_large_en_v1_5 from './models/BAAI_bge-large-en-v1.5';

/** All DeepInfra models */
export const models: Record<string, ModelDefinition> = {
  'meta-llama/Llama-3.3-70B-Instruct': meta_llama_Llama_3_3_70B_Instruct,
  'meta-llama/Meta-Llama-3.1-70B-Instruct': meta_llama_Meta_Llama_3_1_70B_Instruct,
  'meta-llama/Meta-Llama-3.1-8B-Instruct': meta_llama_Meta_Llama_3_1_8B_Instruct,
  'deepseek-ai/DeepSeek-R1': deepseek_ai_DeepSeek_R1,
  'deepseek-ai/DeepSeek-V3': deepseek_ai_DeepSeek_V3,
  'Qwen/Qwen2.5-72B-Instruct': Qwen_Qwen2_5_72B_Instruct,
  'BAAI/bge-large-en-v1.5': BAAI_bge_large_en_v1_5,
};

/** DeepInfra provider definition */
export const provider: ProviderDefinition = defineProvider({
  id: 'deepinfra',
  name: 'DeepInfra',
  category: 'cloud',
  apiFormat: 'openai-completions',
  baseUrl: 'https://api.deepinfra.com/v1/openai',
  docsUrl: 'https://deepinfra.com/docs',
  pricingUrl: 'https://deepinfra.com/pricing',
  statusUrl: 'https://status.deepinfra.com',
  auth: {
    type: 'api_key',
    header: 'Authorization',
    prefix: 'Bearer ',
    envVar: 'DEEPINFRA_API_KEY',
  },
  models,
});

export default provider;

// Re-export individual models
export {
  meta_llama_Llama_3_3_70B_Instruct,
  meta_llama_Meta_Llama_3_1_70B_Instruct,
  meta_llama_Meta_Llama_3_1_8B_Instruct,
  deepseek_ai_DeepSeek_R1,
  deepseek_ai_DeepSeek_V3,
  Qwen_Qwen2_5_72B_Instruct,
  BAAI_bge_large_en_v1_5,
};

// Re-export defaults for external use
export * from './_defaults';
