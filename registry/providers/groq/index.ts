/**
 * Groq Provider
 *
 * @see {@link https://console.groq.com/docs/api-reference}
 */

import { defineProvider } from '../../base';
import type { ProviderDefinition, ModelDefinition } from '../../types';

import llama_3_3_70b_versatile from './models/llama-3.3-70b-versatile';
import llama_3_1_8b_instant from './models/llama-3.1-8b-instant';
import openai_gpt_oss_20b from './models/openai_gpt-oss-20b';
import openai_gpt_oss_120b from './models/openai_gpt-oss-120b';
import openai_gpt_oss_safeguard_20b from './models/openai_gpt-oss-safeguard-20b';
import meta_llama_llama_4_scout_17b_16e_instruct from './models/meta-llama_llama-4-scout-17b-16e-instruct';
import meta_llama_llama_4_maverick_17b_128e_instruct from './models/meta-llama_llama-4-maverick-17b-128e-instruct';
import meta_llama_llama_guard_4_12b from './models/meta-llama_llama-guard-4-12b';
import moonshotai_kimi_k2_instruct_0905 from './models/moonshotai_kimi-k2-instruct-0905';
import qwen_qwen3_32b from './models/qwen_qwen3-32b';
import mistralai_mistral_saba_24b_instruct from './models/mistralai_mistral-saba-24b-instruct';
import whisper_large_v3 from './models/whisper-large-v3';
import whisper_large_v3_turbo from './models/whisper-large-v3-turbo';
import allam_2_7b from './models/allam-2-7b';
import groq_compound from './models/groq_compound';
import groq_compound_mini from './models/groq_compound-mini';
import meta_llama_llama_prompt_guard_2_22m from './models/meta-llama_llama-prompt-guard-2-22m';
import meta_llama_llama_prompt_guard_2_86m from './models/meta-llama_llama-prompt-guard-2-86m';
import playai_tts from './models/playai-tts';
import playai_tts_arabic from './models/playai-tts-arabic';

/** All Groq models (currently available) */
export const models: Record<string, ModelDefinition> = {
  'llama-3.3-70b-versatile': llama_3_3_70b_versatile,
  'llama-3.1-8b-instant': llama_3_1_8b_instant,
  'openai/gpt-oss-20b': openai_gpt_oss_20b,
  'openai/gpt-oss-120b': openai_gpt_oss_120b,
  'openai/gpt-oss-safeguard-20b': openai_gpt_oss_safeguard_20b,
  'meta-llama/llama-4-scout-17b-16e-instruct': meta_llama_llama_4_scout_17b_16e_instruct,
  'meta-llama/llama-4-maverick-17b-128e-instruct': meta_llama_llama_4_maverick_17b_128e_instruct,
  'meta-llama/llama-guard-4-12b': meta_llama_llama_guard_4_12b,
  'meta-llama/llama-prompt-guard-2-22m': meta_llama_llama_prompt_guard_2_22m,
  'meta-llama/llama-prompt-guard-2-86m': meta_llama_llama_prompt_guard_2_86m,
  'moonshotai/kimi-k2-instruct-0905': moonshotai_kimi_k2_instruct_0905,
  'qwen/qwen3-32b': qwen_qwen3_32b,
  'mistralai/mistral-saba-24b-instruct': mistralai_mistral_saba_24b_instruct,
  'whisper-large-v3': whisper_large_v3,
  'whisper-large-v3-turbo': whisper_large_v3_turbo,
  'playai-tts': playai_tts,
  'playai-tts-arabic': playai_tts_arabic,
  'allam-2-7b': allam_2_7b,
  'groq/compound': groq_compound,
  'groq/compound-mini': groq_compound_mini,
};

/** Groq provider definition */
export const provider: ProviderDefinition = defineProvider({
  id: 'groq',
  name: 'Groq',
  category: 'official',
  apiFormat: 'openai-responses',
  baseUrl: 'https://api.groq.com/openai/v1',
  docsUrl: 'https://console.groq.com/docs/api-reference',
  pricingUrl: 'https://groq.com/pricing',
  statusUrl: 'https://status.groq.com/',
  auth: {
    type: 'bearer',
    header: 'Authorization',
    prefix: 'Bearer ',
    envVar: 'GROQ_API_KEY',
  },
  models,
});

export default provider;

// Re-export individual models
export {
  llama_3_3_70b_versatile,
  llama_3_1_8b_instant,
  openai_gpt_oss_20b,
  openai_gpt_oss_120b,
  openai_gpt_oss_safeguard_20b,
  meta_llama_llama_4_scout_17b_16e_instruct,
  meta_llama_llama_4_maverick_17b_128e_instruct,
  meta_llama_llama_guard_4_12b,
  meta_llama_llama_prompt_guard_2_22m,
  meta_llama_llama_prompt_guard_2_86m,
  moonshotai_kimi_k2_instruct_0905,
  qwen_qwen3_32b,
  mistralai_mistral_saba_24b_instruct,
  whisper_large_v3,
  whisper_large_v3_turbo,
  playai_tts,
  playai_tts_arabic,
  allam_2_7b,
  groq_compound,
  groq_compound_mini,
};

// Re-export defaults for external use
export * from './_defaults';
