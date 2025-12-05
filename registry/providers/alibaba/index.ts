/**
 * Alibaba Cloud (Qwen) Provider
 * 
 * @see {@link https://help.aliyun.com/zh/model-studio/}
 */

import { defineProvider } from '../../base';
import type { ProviderDefinition, ModelDefinition } from '../../types';

import qwen_max from './models/qwen-max';
import qwen_max_latest from './models/qwen-max-latest';
import qwen3_max from './models/qwen3-max';
import qwen3_max_preview from './models/qwen3-max-preview';
import qwen_plus from './models/qwen-plus';
import qwen_plus_latest from './models/qwen-plus-latest';
import qwen_turbo from './models/qwen-turbo';
import qwen_turbo_latest from './models/qwen-turbo-latest';
import qwen_long from './models/qwen-long';
import qwen_long_latest from './models/qwen-long-latest';
import qwen_flash from './models/qwen-flash';
import qwen3_next_80b_a3b_thinking from './models/qwen3-next-80b-a3b-thinking';
import qwen2_5_32b_instruct from './models/qwen2.5-32b-instruct';
import qwq_plus from './models/qwq-plus';

import qwen3_omni_flash from './models/qwen3-omni-flash';
import qwen_omni_turbo from './models/qwen-omni-turbo';
import qwen_omni_turbo_latest from './models/qwen-omni-turbo-latest';
import qwen3_omni_flash_realtime from './models/qwen3-omni-flash-realtime';
import qwen_omni_turbo_realtime from './models/qwen-omni-turbo-realtime';
import qwen_omni_turbo_realtime_latest from './models/qwen-omni-turbo-realtime-latest';

import qwen_vl_max from './models/qwen-vl-max';
import qwen_vl_plus from './models/qwen-vl-plus';
import qwen3_vl_plus from './models/qwen3-vl-plus';
import qwen3_vl_flash from './models/qwen3-vl-flash';
import qvq_max from './models/qvq-max';

import qwen_coder_plus from './models/qwen-coder-plus';
import qwen3_coder_plus from './models/qwen3-coder-plus';
import qwen3_coder_flash from './models/qwen3-coder-flash';
import qwen_coder_turbo from './models/qwen-coder-turbo';

import qwen_math_plus from './models/qwen-math-plus';
import qwen_math_plus_latest from './models/qwen-math-plus-latest';
import qwen_math_turbo from './models/qwen-math-turbo';
import qwen_math_turbo_latest from './models/qwen-math-turbo-latest';

import qwen_doc_turbo from './models/qwen-doc-turbo';
import qwen_deep_research from './models/qwen-deep-research';

import text_embedding_v3 from './models/text-embedding-v3';
import text_embedding_v4 from './models/text-embedding-v4';

import qwen_image_plus from './models/qwen-image-plus';
import qwen_image_edit_plus from './models/qwen-image-edit-plus';

import qwen_tts from './models/qwen-tts';
import qwen3_tts_flash_realtime from './models/qwen3-tts-flash-realtime';
import qwen3_asr_flash from './models/qwen3-asr-flash';
import qwen3_asr_flash_realtime from './models/qwen3-asr-flash-realtime';

import qwen_mt_image from './models/qwen-mt-image';

import qwen_plus_character_ja from './models/qwen-plus-character-ja';

/** All Alibaba Cloud (Qwen) models */
export const models: Record<string, ModelDefinition> = {
  // General-purpose chat models
  'qwen-max': qwen_max,
  'qwen-max-latest': qwen_max_latest,
  'qwen3-max': qwen3_max,
  'qwen3-max-preview': qwen3_max_preview,
  'qwen-plus': qwen_plus,
  'qwen-plus-latest': qwen_plus_latest,
  'qwen-turbo': qwen_turbo,
  'qwen-turbo-latest': qwen_turbo_latest,
  'qwen-long': qwen_long,
  'qwen-long-latest': qwen_long_latest,
  'qwen-flash': qwen_flash,
  'qwen3-next-80b-a3b-thinking': qwen3_next_80b_a3b_thinking,
  'qwen2.5-32b-instruct': qwen2_5_32b_instruct,
  'qwq-plus': qwq_plus,

  // Omni and realtime multimodal
  'qwen3-omni-flash': qwen3_omni_flash,
  'qwen-omni-turbo': qwen_omni_turbo,
  'qwen-omni-turbo-latest': qwen_omni_turbo_latest,
  'qwen3-omni-flash-realtime': qwen3_omni_flash_realtime,
  'qwen-omni-turbo-realtime': qwen_omni_turbo_realtime,
  'qwen-omni-turbo-realtime-latest': qwen_omni_turbo_realtime_latest,

  // Vision and reasoning models
  'qwen-vl-max': qwen_vl_max,
  'qwen-vl-plus': qwen_vl_plus,
  'qwen3-vl-plus': qwen3_vl_plus,
  'qwen3-vl-flash': qwen3_vl_flash,
  'qvq-max': qvq_max,

  // Code and math models
  'qwen-coder-plus': qwen_coder_plus,
  'qwen3-coder-plus': qwen3_coder_plus,
  'qwen3-coder-flash': qwen3_coder_flash,
  'qwen-coder-turbo': qwen_coder_turbo,
  'qwen-math-plus': qwen_math_plus,
  'qwen-math-plus-latest': qwen_math_plus_latest,
  'qwen-math-turbo': qwen_math_turbo,
  'qwen-math-turbo-latest': qwen_math_turbo_latest,

  // Specialized text models
  'qwen-doc-turbo': qwen_doc_turbo,
  'qwen-deep-research': qwen_deep_research,
  'qwen-plus-character-ja': qwen_plus_character_ja,

  // Embedding models
  'text-embedding-v3': text_embedding_v3,
  'text-embedding-v4': text_embedding_v4,

  // Image generation and editing
  'qwen-image-plus': qwen_image_plus,
  'qwen-image-edit-plus': qwen_image_edit_plus,
  'qwen-mt-image': qwen_mt_image,

  // Audio and speech
  'qwen-tts': qwen_tts,
  'qwen3-tts-flash-realtime': qwen3_tts_flash_realtime,
  'qwen3-asr-flash': qwen3_asr_flash,
  'qwen3-asr-flash-realtime': qwen3_asr_flash_realtime,
};

/** Alibaba Cloud (Qwen) provider definition */
export const provider: ProviderDefinition = defineProvider({
  ...{
  id: 'alibaba',
  name: 'Alibaba Cloud (Qwen)',
  category: 'official',
  apiFormat: 'openai-completions',
  baseUrl: 'https://dashscope-intl.aliyuncs.com/compatible-mode/v1',
  docsUrl: 'https://www.alibabacloud.com/help/en/model-studio/qwen-api-reference',
  pricingUrl: 'https://www.alibabacloud.com/help/en/model-studio/product-pricing',
  statusUrl: 'https://status.alibabacloud.com/',
  auth: {
    type: 'api_key',
    header: 'Authorization',
    prefix: 'Bearer ',
    envVar: 'DASHSCOPE_API_KEY',
  },
},
  models,
});

export default provider;

// Re-export individual models
export {
  qwen_max,
  qwen_max_latest,
  qwen3_max,
  qwen3_max_preview,
  qwen_plus,
  qwen_plus_latest,
  qwen_turbo,
  qwen_turbo_latest,
  qwen_long,
  qwen_long_latest,
  qwen_vl_max,
  qwen_vl_plus,
  qwen_coder_plus,
  qwen_coder_turbo,
  qwen_flash,
  qwen_math_plus,
  qwen_math_plus_latest,
  qwen_math_turbo,
  qwen_math_turbo_latest,
  qwen3_next_80b_a3b_thinking,
  qwen2_5_32b_instruct,
  qwq_plus,
  qwen3_omni_flash,
  qwen_omni_turbo,
  qwen_omni_turbo_latest,
  qwen3_omni_flash_realtime,
  qwen_omni_turbo_realtime,
  qwen_omni_turbo_realtime_latest,
  qwen3_vl_plus,
  qwen3_vl_flash,
  qvq_max,
  qwen3_coder_plus,
  qwen3_coder_flash,
  qwen_doc_turbo,
  qwen_deep_research,
  text_embedding_v3,
  text_embedding_v4,
  qwen_image_plus,
  qwen_image_edit_plus,
  qwen_mt_image,
  qwen_tts,
  qwen3_tts_flash_realtime,
  qwen3_asr_flash,
  qwen3_asr_flash_realtime,
  qwen_plus_character_ja,
};

// Re-export defaults for external use
export * from './_defaults';
