/**
 * Together AI Provider
 * 
 * @see {@link https://docs.together.ai/}
 */

import { defineProvider } from '../../base';
import type { ProviderDefinition, ModelDefinition } from '../../types';

import meta_llama_Llama_3_3_70B_Instruct_Turbo from './models/meta-llama_Llama-3.3-70B-Instruct-Turbo';
import meta_llama_Meta_Llama_3_1_405B_Instruct_Turbo from './models/meta-llama_Meta-Llama-3.1-405B-Instruct-Turbo';
import meta_llama_Meta_Llama_3_1_70B_Instruct_Turbo from './models/meta-llama_Meta-Llama-3.1-70B-Instruct-Turbo';
import meta_llama_Meta_Llama_3_1_8B_Instruct_Turbo from './models/meta-llama_Meta-Llama-3.1-8B-Instruct-Turbo';
import deepseek_ai_DeepSeek_R1 from './models/deepseek-ai_DeepSeek-R1';
import deepseek_ai_DeepSeek_V3 from './models/deepseek-ai_DeepSeek-V3';
import Qwen_Qwen2_5_72B_Instruct_Turbo from './models/Qwen_Qwen2.5-72B-Instruct-Turbo';
import togethercomputer_m2_bert_80M_8k_retrieval from './models/togethercomputer_m2-bert-80M-8k-retrieval';

/** All Together AI models */
export const models: Record<string, ModelDefinition> = {
  'meta-llama/Llama-3.3-70B-Instruct-Turbo': meta_llama_Llama_3_3_70B_Instruct_Turbo,
  'meta-llama/Meta-Llama-3.1-405B-Instruct-Turbo': meta_llama_Meta_Llama_3_1_405B_Instruct_Turbo,
  'meta-llama/Meta-Llama-3.1-70B-Instruct-Turbo': meta_llama_Meta_Llama_3_1_70B_Instruct_Turbo,
  'meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo': meta_llama_Meta_Llama_3_1_8B_Instruct_Turbo,
  'deepseek-ai/DeepSeek-R1': deepseek_ai_DeepSeek_R1,
  'deepseek-ai/DeepSeek-V3': deepseek_ai_DeepSeek_V3,
  'Qwen/Qwen2.5-72B-Instruct-Turbo': Qwen_Qwen2_5_72B_Instruct_Turbo,
  'togethercomputer/m2-bert-80M-8k-retrieval': togethercomputer_m2_bert_80M_8k_retrieval,
};

/** Together AI provider definition */
export const provider: ProviderDefinition = defineProvider({
  ...{
  id: 'together',
  name: 'Together AI',
  category: 'official',
  apiFormat: 'openai-completions',
  baseUrl: 'https://api.together.xyz/v1',
  docsUrl: 'https://docs.together.ai/',
  pricingUrl: 'https://www.together.ai/pricing',
},
  models,
});

export default provider;

// Re-export individual models
export {
  meta_llama_Llama_3_3_70B_Instruct_Turbo,
  meta_llama_Meta_Llama_3_1_405B_Instruct_Turbo,
  meta_llama_Meta_Llama_3_1_70B_Instruct_Turbo,
  meta_llama_Meta_Llama_3_1_8B_Instruct_Turbo,
  deepseek_ai_DeepSeek_R1,
  deepseek_ai_DeepSeek_V3,
  Qwen_Qwen2_5_72B_Instruct_Turbo,
  togethercomputer_m2_bert_80M_8k_retrieval,
};

// Re-export defaults for external use
export * from './_defaults';
