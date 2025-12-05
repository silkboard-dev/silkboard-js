/**
 * Chutes AI Provider
 *
 * @see {@link https://chutes.ai/docs}
 */

import { defineProvider } from '../../base';
import type { ProviderDefinition, ModelDefinition } from '../../types';

import deepseek_ai_DeepSeek_R1 from './models/deepseek-ai_DeepSeek-R1';
import deepseek_ai_DeepSeek_V3 from './models/deepseek-ai_DeepSeek-V3';
import deepseek_r1_0528 from './models/deepseek_r1_0528';
import deepseek_r1_0528_qwen3_8b from './models/deepseek_r1_0528_qwen3_8b';
import deepseek_r1_distill_llama_70b from './models/deepseek_r1_distill_llama_70b';
import deepseek_v3_0324 from './models/deepseek_v3_0324';
import deepseek_v3_1 from './models/deepseek_v3_1';
import deepseek_v3_1_terminus from './models/deepseek_v3_1_terminus';
import deepseek_v3_2 from './models/deepseek_v3_2';
import deepseek_v3_2_speciale from './models/deepseek_v3_2_speciale';

import tngtech_deepseek_r1t_chimera from './models/tngtech_deepseek_r1t_chimera';
import tngtech_deepseek_tng_r1t2_chimera from './models/tngtech_deepseek_tng_r1t2_chimera';
import tngtech_tng_r1t_chimera from './models/tngtech_tng_r1t_chimera';

import qwen_2_5_coder_32b_instruct from './models/qwen_2_5_coder_32b_instruct';
import qwen_2_5_72b_instruct from './models/qwen_2_5_72b_instruct';
import qwen_2_5_vl_32b_instruct from './models/qwen_2_5_vl_32b_instruct';
import qwen_2_5_vl_72b_instruct from './models/qwen_2_5_vl_72b_instruct';
import qwen_3_32b from './models/qwen_3_32b';
import qwen_3_14b from './models/qwen_3_14b';
import qwen_3_235b_a22b from './models/qwen_3_235b_a22b';
import qwen_3_235b_a22b_instruct_2507 from './models/qwen_3_235b_a22b_instruct_2507';
import qwen_3_235b_a22b_thinking_2507 from './models/qwen_3_235b_a22b_thinking_2507';
import qwen_3_next_80b_a3b_instruct from './models/qwen_3_next_80b_a3b_instruct';
import qwen_3_coder_480b_a35b_instruct_fp8 from './models/qwen_3_coder_480b_a35b_instruct_fp8';
import qwen_3_coder_30b_a3b_instruct from './models/qwen_3_coder_30b_a3b_instruct';
import qwen_3_30b_a3b from './models/qwen_3_30b_a3b';
import qwen_3_30b_a3b_instruct_2507 from './models/qwen_3_30b_a3b_instruct_2507';
import qwen_3_vl_235b_a22b_instruct from './models/qwen_3_vl_235b_a22b_instruct';
import qwen_3_vl_235b_a22b_thinking from './models/qwen_3_vl_235b_a22b_thinking';

import unsloth_mistral_nemo_2407 from './models/unsloth_mistral_nemo_2407';
import unsloth_mistral_small_24b_2501 from './models/unsloth_mistral_small_24b_2501';
import unsloth_gemma_3_4b_it from './models/unsloth_gemma_3_4b_it';
import unsloth_gemma_3_12b_it from './models/unsloth_gemma_3_12b_it';
import unsloth_gemma_3_27b_it from './models/unsloth_gemma_3_27b_it';

import chutes_mistral_small_3_1_24b_2503 from './models/chutes_mistral_small_3_1_24b_2503';
import chutes_mistral_small_3_2_24b_2506 from './models/chutes_mistral_small_3_2_24b_2506';

import glm_4_6 from './models/glm_4_6';
import glm_4_5 from './models/glm_4_5';
import glm_4_5_air from './models/glm_4_5_air';

import gpt_oss_120b from './models/gpt_oss_120b';
import gpt_oss_20b from './models/gpt_oss_20b';

import kimi_k2_instruct_0905 from './models/kimi_k2_instruct_0905';
import kimi_k2_thinking from './models/kimi_k2_thinking';

import tongyi_deepresearch_30b_a3b from './models/tongyi_deepresearch_30b_a3b';

import internvl3_78b from './models/internvl3_78b';

import minimax_m2 from './models/minimax_m2';

import mai_ds_r1_fp8 from './models/mai_ds_r1_fp8';

import qwq_32b_rpr_v1 from './models/qwq_32b_rpr_v1';

import dots_ocr from './models/dots_ocr';

import deephermes_3_mistral_24b_preview from './models/deephermes_3_mistral_24b_preview';
import hermes_4_70b from './models/hermes_4_70b';
import hermes_4_405b_fp8 from './models/hermes_4_405b_fp8';
import hermes_4_14b from './models/hermes_4_14b';

import longcat_flash_chat_fp8 from './models/longcat_flash_chat_fp8';

/** All Chutes AI models */
export const models: Record<string, ModelDefinition> = {
  // DeepSeek family
  'deepseek-ai/DeepSeek-R1': deepseek_ai_DeepSeek_R1,
  'deepseek-ai/DeepSeek-R1-0528': deepseek_r1_0528,
  'deepseek-ai/DeepSeek-R1-0528-Qwen3-8B': deepseek_r1_0528_qwen3_8b,
  'deepseek-ai/DeepSeek-R1-Distill-Llama-70B': deepseek_r1_distill_llama_70b,
  'deepseek-ai/DeepSeek-V3': deepseek_ai_DeepSeek_V3,
  'deepseek-ai/DeepSeek-V3-0324': deepseek_v3_0324,
  'deepseek-ai/DeepSeek-V3.1': deepseek_v3_1,
  'deepseek-ai/DeepSeek-V3.1-Terminus': deepseek_v3_1_terminus,
  'deepseek-ai/DeepSeek-V3.2': deepseek_v3_2,
  'deepseek-ai/DeepSeek-V3.2-Speciale': deepseek_v3_2_speciale,

  // TNGTech DeepSeek variants
  'tngtech/DeepSeek-R1T-Chimera': tngtech_deepseek_r1t_chimera,
  'tngtech/DeepSeek-TNG-R1T2-Chimera': tngtech_deepseek_tng_r1t2_chimera,
  'tngtech/TNG-R1T-Chimera': tngtech_tng_r1t_chimera,

  // Qwen models
  'Qwen/Qwen2.5-Coder-32B-Instruct': qwen_2_5_coder_32b_instruct,
  'Qwen/Qwen2.5-72B-Instruct': qwen_2_5_72b_instruct,
  'Qwen/Qwen2.5-VL-32B-Instruct': qwen_2_5_vl_32b_instruct,
  'Qwen/Qwen2.5-VL-72B-Instruct': qwen_2_5_vl_72b_instruct,
  'Qwen/Qwen3-32B': qwen_3_32b,
  'Qwen/Qwen3-14B': qwen_3_14b,
  'Qwen/Qwen3-235B-A22B': qwen_3_235b_a22b,
  'Qwen/Qwen3-235B-A22B-Instruct-2507': qwen_3_235b_a22b_instruct_2507,
  'Qwen/Qwen3-235B-A22B-Thinking-2507': qwen_3_235b_a22b_thinking_2507,
  'Qwen/Qwen3-Next-80B-A3B-Instruct': qwen_3_next_80b_a3b_instruct,
  'Qwen/Qwen3-Coder-480B-A35B-Instruct-FP8': qwen_3_coder_480b_a35b_instruct_fp8,
  'Qwen/Qwen3-Coder-30B-A3B-Instruct': qwen_3_coder_30b_a3b_instruct,
  'Qwen/Qwen3-30B-A3B': qwen_3_30b_a3b,
  'Qwen/Qwen3-30B-A3B-Instruct-2507': qwen_3_30b_a3b_instruct_2507,
  'Qwen/Qwen3-VL-235B-A22B-Instruct': qwen_3_vl_235b_a22b_instruct,
  'Qwen/Qwen3-VL-235B-A22B-Thinking': qwen_3_vl_235b_a22b_thinking,

  // Unsloth models
  'unsloth/Mistral-Nemo-Instruct-2407': unsloth_mistral_nemo_2407,
  'unsloth/Mistral-Small-24B-Instruct-2501': unsloth_mistral_small_24b_2501,
  'unsloth/gemma-3-4b-it': unsloth_gemma_3_4b_it,
  'unsloth/gemma-3-12b-it': unsloth_gemma_3_12b_it,
  'unsloth/gemma-3-27b-it': unsloth_gemma_3_27b_it,

  // Chutes-hosted Mistral
  'chutesai/Mistral-Small-3.1-24B-Instruct-2503': chutes_mistral_small_3_1_24b_2503,
  'chutesai/Mistral-Small-3.2-24B-Instruct-2506': chutes_mistral_small_3_2_24b_2506,

  // GLM models
  'zai-org/GLM-4.6': glm_4_6,
  'zai-org/GLM-4.5': glm_4_5,
  'zai-org/GLM-4.5-Air': glm_4_5_air,

  // OpenAI open-weight models
  'openai/gpt-oss-120b': gpt_oss_120b,
  'openai/gpt-oss-20b': gpt_oss_20b,

  // Moonshot Kimi models
  'moonshotai/Kimi-K2-Instruct-0905': kimi_k2_instruct_0905,
  'moonshotai/Kimi-K2-Thinking': kimi_k2_thinking,

  // Tongyi DeepResearch
  'Alibaba-NLP/Tongyi-DeepResearch-30B-A3B': tongyi_deepresearch_30b_a3b,

  // Vision / multimodal models
  'OpenGVLab/InternVL3-78B': internvl3_78b,

  // MiniMax
  'MiniMaxAI/MiniMax-M2': minimax_m2,

  // Microsoft MAI DeepSeek
  'microsoft/MAI-DS-R1-FP8': mai_ds_r1_fp8,

  // ArliAI QwQ
  'ArliAI/QwQ-32B-ArliAI-RpR-v1': qwq_32b_rpr_v1,

  // OCR
  'rednote-hilab/dots.ocr': dots_ocr,

  // NousResearch Hermes / DeepHermes
  'NousResearch/DeepHermes-3-Mistral-24B-Preview': deephermes_3_mistral_24b_preview,
  'NousResearch/Hermes-4-70B': hermes_4_70b,
  'NousResearch/Hermes-4-405B-FP8': hermes_4_405b_fp8,
  'NousResearch/Hermes-4-14B': hermes_4_14b,

  // Meituan LongCat
  'meituan-longcat/LongCat-Flash-Chat-FP8': longcat_flash_chat_fp8,
};

/** Chutes AI provider definition */
export const provider: ProviderDefinition = defineProvider({
  ...{
    id: 'chutes',
    name: 'Chutes AI',
    category: 'official',
    apiFormat: 'openai-completions',
    baseUrl: 'https://llm.chutes.ai/v1',
    docsUrl: 'https://chutes.ai/docs',
    pricingUrl: 'https://chutes.ai/pricing',
    statusUrl: 'https://status.chutes.ai/',
    auth: {
      type: 'bearer',
      header: 'Authorization',
      prefix: 'Bearer ',
      envVar: 'CHUTES_API_KEY',
    },
  },
  models,
});

export default provider;

// Re-export individual models
export {
  deepseek_ai_DeepSeek_R1,
  deepseek_ai_DeepSeek_V3,
  deepseek_r1_0528,
  deepseek_r1_0528_qwen3_8b,
  deepseek_r1_distill_llama_70b,
  deepseek_v3_0324,
  deepseek_v3_1,
  deepseek_v3_1_terminus,
  deepseek_v3_2,
  deepseek_v3_2_speciale,
  tngtech_deepseek_r1t_chimera,
  tngtech_deepseek_tng_r1t2_chimera,
  tngtech_tng_r1t_chimera,
  qwen_2_5_coder_32b_instruct,
  qwen_2_5_72b_instruct,
  qwen_2_5_vl_32b_instruct,
  qwen_2_5_vl_72b_instruct,
  qwen_3_32b,
  qwen_3_14b,
  qwen_3_235b_a22b,
  qwen_3_235b_a22b_instruct_2507,
  qwen_3_235b_a22b_thinking_2507,
  qwen_3_next_80b_a3b_instruct,
  qwen_3_coder_480b_a35b_instruct_fp8,
  qwen_3_coder_30b_a3b_instruct,
  qwen_3_30b_a3b,
  qwen_3_30b_a3b_instruct_2507,
  qwen_3_vl_235b_a22b_instruct,
  qwen_3_vl_235b_a22b_thinking,
  unsloth_mistral_nemo_2407,
  unsloth_mistral_small_24b_2501,
  unsloth_gemma_3_4b_it,
  unsloth_gemma_3_12b_it,
  unsloth_gemma_3_27b_it,
  chutes_mistral_small_3_1_24b_2503,
  chutes_mistral_small_3_2_24b_2506,
  glm_4_6,
  glm_4_5,
  glm_4_5_air,
  gpt_oss_120b,
  gpt_oss_20b,
  kimi_k2_instruct_0905,
  kimi_k2_thinking,
  tongyi_deepresearch_30b_a3b,
  internvl3_78b,
  minimax_m2,
  mai_ds_r1_fp8,
  qwq_32b_rpr_v1,
  dots_ocr,
  deephermes_3_mistral_24b_preview,
  hermes_4_70b,
  hermes_4_405b_fp8,
  hermes_4_14b,
  longcat_flash_chat_fp8,
};

// Re-export defaults for external use
export * from './_defaults';
