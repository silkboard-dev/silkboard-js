/**
 * Cerebras Provider
 * 
 * @see {@link https://inference-docs.cerebras.ai/}
 */

import { defineProvider } from '../../base';
import type { ProviderDefinition, ModelDefinition } from '../../types';

import llama3_1_8b from './models/llama3.1-8b';
import llama_3_3_70b from './models/llama-3.3-70b';
import qwen_3_32b from './models/qwen-3-32b';
import qwen_3_235b_a22b_instruct_2507 from './models/qwen-3-235b-a22b-instruct-2507';
import gpt_oss_120b from './models/gpt-oss-120b';
import zai_glm_4_6 from './models/zai-glm-4.6';

/** All Cerebras models */
export const models: Record<string, ModelDefinition> = {
  'llama3.1-8b': llama3_1_8b,
  'llama-3.3-70b': llama_3_3_70b,
  'qwen-3-32b': qwen_3_32b,
  'qwen-3-235b-a22b-instruct-2507': qwen_3_235b_a22b_instruct_2507,
  'gpt-oss-120b': gpt_oss_120b,
  'zai-glm-4.6': zai_glm_4_6,
};

/** Cerebras provider definition */
export const provider: ProviderDefinition = defineProvider({
  ...{
  id: 'cerebras',
  name: 'Cerebras',
  category: 'official',
  apiFormat: 'openai-completions',
  baseUrl: 'https://api.cerebras.ai/v1',
  docsUrl: 'https://inference-docs.cerebras.ai/',
  pricingUrl: 'https://www.cerebras.ai/pricing',
  statusUrl: 'https://status.cerebras.ai/',
  auth: {
    type: 'bearer',
    header: 'Authorization',
    prefix: 'Bearer ',
    envVar: 'CEREBRAS_API_KEY',
  },
},
  models,
});

export default provider;

// Re-export individual models
export {
  llama3_1_8b,
  llama_3_3_70b,
  qwen_3_32b,
  qwen_3_235b_a22b_instruct_2507,
  gpt_oss_120b,
  zai_glm_4_6,
};

// Re-export defaults for external use
export * from './_defaults';
