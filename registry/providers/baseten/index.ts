/**
 * Baseten Provider
 * 
 * @see {@link https://docs.baseten.co/}
 */

import { defineProvider } from '../../base';
import type { ProviderDefinition, ModelDefinition } from '../../types';

import openai_gpt_oss_120b from './models/openai_gpt-oss-120b';
import deepseek_ai_DeepSeek_V3_2 from './models/deepseek-ai_DeepSeek-V3.2';
import deepseek_ai_DeepSeek_V3_1 from './models/deepseek-ai_DeepSeek-V3.1';
import deepseek_ai_DeepSeek_R1_0528 from './models/deepseek-ai_DeepSeek-R1-0528';
import deepseek_ai_DeepSeek_V3_0324 from './models/deepseek-ai_DeepSeek-V3-0324';
import moonshotai_Kimi_K2_Thinking from './models/moonshotai_Kimi-K2-Thinking';
import moonshotai_Kimi_K2_Instruct_0905 from './models/moonshotai_Kimi-K2-Instruct-0905';
import Qwen_Qwen3_235B_A22B_Instruct_2507 from './models/Qwen_Qwen3-235B-A22B-Instruct-2507';
import Qwen_Qwen3_Coder_480B_A35B_Instruct from './models/Qwen_Qwen3-Coder-480B-A35B-Instruct';
import zai_org_GLM_4_6 from './models/zai-org_GLM-4.6';

/** All Baseten models */
export const models: Record<string, ModelDefinition> = {
  'openai/gpt-oss-120b': openai_gpt_oss_120b,
  'deepseek-ai/DeepSeek-V3.2': deepseek_ai_DeepSeek_V3_2,
  'deepseek-ai/DeepSeek-V3.1': deepseek_ai_DeepSeek_V3_1,
  'deepseek-ai/DeepSeek-R1-0528': deepseek_ai_DeepSeek_R1_0528,
  'deepseek-ai/DeepSeek-V3-0324': deepseek_ai_DeepSeek_V3_0324,
  'moonshotai/Kimi-K2-Thinking': moonshotai_Kimi_K2_Thinking,
  'moonshotai/Kimi-K2-Instruct-0905': moonshotai_Kimi_K2_Instruct_0905,
  'Qwen/Qwen3-235B-A22B-Instruct-2507': Qwen_Qwen3_235B_A22B_Instruct_2507,
  'Qwen/Qwen3-Coder-480B-A35B-Instruct': Qwen_Qwen3_Coder_480B_A35B_Instruct,
  'zai-org/GLM-4.6': zai_org_GLM_4_6,
};

/** Baseten provider definition */
export const provider: ProviderDefinition = defineProvider({
  ...{
  id: 'baseten',
  name: 'Baseten',
  category: 'cloud',
  apiFormat: 'openai-completions',
  baseUrl: 'https://inference.baseten.co/v1',
  docsUrl: 'https://docs.baseten.co/development/model-apis/overview',
  pricingUrl: 'https://www.baseten.co/pricing',
  statusUrl: 'https://status.baseten.co/',
  auth: {
    type: 'bearer',
    header: 'Authorization',
    prefix: 'Bearer ',
    envVar: 'BASETEN_API_KEY',
  },
},
  models,
});

export default provider;

// Re-export individual models
export {
  openai_gpt_oss_120b,
  deepseek_ai_DeepSeek_V3_2,
  deepseek_ai_DeepSeek_V3_1,
  deepseek_ai_DeepSeek_R1_0528,
  deepseek_ai_DeepSeek_V3_0324,
  moonshotai_Kimi_K2_Thinking,
  moonshotai_Kimi_K2_Instruct_0905,
  Qwen_Qwen3_235B_A22B_Instruct_2507,
  Qwen_Qwen3_Coder_480B_A35B_Instruct,
  zai_org_GLM_4_6,
};

// Re-export defaults for external use
export * from './_defaults';
