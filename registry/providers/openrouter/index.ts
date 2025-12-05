/**
 * OpenRouter Provider
 * 
 * @see {@link https://openrouter.ai/docs}
 */

import { defineProvider } from '../../base';
import type { ProviderDefinition, ModelDefinition } from '../../types';

import openai_gpt_4o from './models/openai_gpt-4o';
import openai_gpt_4o_mini from './models/openai_gpt-4o-mini';
import anthropic_claude_3_5_sonnet from './models/anthropic_claude-3.5-sonnet';
import anthropic_claude_3_opus from './models/anthropic_claude-3-opus';
import google_gemini_pro_1_5 from './models/google_gemini-pro-1.5';
import meta_llama_llama_3_3_70b_instruct from './models/meta-llama_llama-3.3-70b-instruct';
import deepseek_deepseek_r1 from './models/deepseek_deepseek-r1';
import deepseek_deepseek_chat from './models/deepseek_deepseek-chat';

/** All OpenRouter models */
export const models: Record<string, ModelDefinition> = {
  'openai/gpt-4o': openai_gpt_4o,
  'openai/gpt-4o-mini': openai_gpt_4o_mini,
  'anthropic/claude-3.5-sonnet': anthropic_claude_3_5_sonnet,
  'anthropic/claude-3-opus': anthropic_claude_3_opus,
  'google/gemini-pro-1.5': google_gemini_pro_1_5,
  'meta-llama/llama-3.3-70b-instruct': meta_llama_llama_3_3_70b_instruct,
  'deepseek/deepseek-r1': deepseek_deepseek_r1,
  'deepseek/deepseek-chat': deepseek_deepseek_chat,
};

/** OpenRouter provider definition */
export const provider: ProviderDefinition = defineProvider({
  ...{
  id: 'openrouter',
  name: 'OpenRouter',
  category: 'gateway',
  apiFormat: 'openai-completions',
  baseUrl: 'https://openrouter.ai/api/v1',
  docsUrl: 'https://openrouter.ai/docs',
  pricingUrl: 'https://openrouter.ai/docs/pricing',
  auth: {
    type: 'bearer',
    header: 'Authorization',
    prefix: 'Bearer ',
    envVar: 'OPENROUTER_API_KEY',
  },
},
  models,
});

export default provider;

// Re-export individual models
export {
  openai_gpt_4o,
  openai_gpt_4o_mini,
  anthropic_claude_3_5_sonnet,
  anthropic_claude_3_opus,
  google_gemini_pro_1_5,
  meta_llama_llama_3_3_70b_instruct,
  deepseek_deepseek_r1,
  deepseek_deepseek_chat,
};

// Re-export defaults for external use
export * from './_defaults';
