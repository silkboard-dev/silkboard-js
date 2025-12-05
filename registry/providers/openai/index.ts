/**
 * OpenAI Provider
 * 
 * @see {@link https://platform.openai.com/docs}
 */

import { defineProvider } from '../../base';
import type { ProviderDefinition, ModelDefinition } from '../../types';

import gpt_5_1 from './models/gpt-5.1';
import gpt_5 from './models/gpt-5';
import gpt_5_1_chat_latest from './models/gpt-5.1-chat-latest';
import gpt_5_1_codex from './models/gpt-5.1-codex';
import gpt_5_1_codex_mini from './models/gpt-5.1-codex-mini';
import gpt_5_codex from './models/gpt-5-codex';
import gpt_5_mini from './models/gpt-5-mini';
import gpt_5_nano from './models/gpt-5-nano';
import gpt_5_pro from './models/gpt-5-pro';
import gpt_4_1 from './models/gpt-4.1';
import gpt_4_1_mini from './models/gpt-4.1-mini';
import gpt_4_1_nano from './models/gpt-4.1-nano';
import gpt_4o from './models/gpt-4o';
import gpt_4o_2024_05_13 from './models/gpt-4o-2024-05-13';
import gpt_4o_mini from './models/gpt-4o-mini';
import gpt_4o_search_preview from './models/gpt-4o-search-preview';
import gpt_4o_mini_search_preview from './models/gpt-4o-mini-search-preview';
import chatgpt_4o_latest from './models/chatgpt-4o-latest';
import gpt_realtime from './models/gpt-realtime';
import gpt_realtime_mini from './models/gpt-realtime-mini';
import gpt_4o_realtime_preview from './models/gpt-4o-realtime-preview';
import gpt_4o_mini_realtime_preview from './models/gpt-4o-mini-realtime-preview';
import gpt_audio from './models/gpt-audio';
import gpt_audio_mini from './models/gpt-audio-mini';
import gpt_4o_audio_preview from './models/gpt-4o-audio-preview';
import gpt_4o_mini_audio_preview from './models/gpt-4o-mini-audio-preview';
import gpt_4o_mini_tts from './models/gpt-4o-mini-tts';
import gpt_4o_transcribe from './models/gpt-4o-transcribe';
import gpt_4o_transcribe_diarize from './models/gpt-4o-transcribe-diarize';
import gpt_4o_mini_transcribe from './models/gpt-4o-mini-transcribe';
import o4_mini from './models/o4-mini';
import o4_mini_deep_research from './models/o4-mini-deep-research';
import o3 from './models/o3';
import o3_mini from './models/o3-mini';
import o3_pro from './models/o3-pro';
import o3_deep_research from './models/o3-deep-research';
import o1 from './models/o1';
import o1_pro from './models/o1-pro';
import gpt_5_search_api from './models/gpt-5-search-api';
import computer_use_preview from './models/computer-use-preview';
import text_embedding_3_large from './models/text-embedding-3-large';
import text_embedding_3_small from './models/text-embedding-3-small';
import gpt_image_1 from './models/gpt-image-1';
import gpt_image_1_mini from './models/gpt-image-1-mini';
import sora_2 from './models/sora-2';
import sora_2_pro from './models/sora-2-pro';
import whisper_1 from './models/whisper-1';
import tts_1 from './models/tts-1';
import tts_1_hd from './models/tts-1-hd';
import omni_moderation_latest from './models/omni-moderation-latest';

/** All OpenAI models */
export const models: Record<string, ModelDefinition> = {
  'gpt-5.1': gpt_5_1,
  'gpt-5': gpt_5,
  'gpt-5.1-chat-latest': gpt_5_1_chat_latest,
  'gpt-5.1-codex': gpt_5_1_codex,
  'gpt-5.1-codex-mini': gpt_5_1_codex_mini,
  'gpt-5-codex': gpt_5_codex,
  'gpt-5-mini': gpt_5_mini,
  'gpt-5-nano': gpt_5_nano,
  'gpt-5-pro': gpt_5_pro,
  'gpt-4.1': gpt_4_1,
  'gpt-4.1-mini': gpt_4_1_mini,
  'gpt-4.1-nano': gpt_4_1_nano,
  'gpt-4o': gpt_4o,
  'gpt-4o-2024-05-13': gpt_4o_2024_05_13,
  'gpt-4o-mini': gpt_4o_mini,
  'gpt-4o-search-preview': gpt_4o_search_preview,
  'gpt-4o-mini-search-preview': gpt_4o_mini_search_preview,
  'chatgpt-4o-latest': chatgpt_4o_latest,
  'gpt-realtime': gpt_realtime,
  'gpt-realtime-mini': gpt_realtime_mini,
  'gpt-4o-realtime-preview': gpt_4o_realtime_preview,
  'gpt-4o-mini-realtime-preview': gpt_4o_mini_realtime_preview,
  'gpt-audio': gpt_audio,
  'gpt-audio-mini': gpt_audio_mini,
  'gpt-4o-audio-preview': gpt_4o_audio_preview,
  'gpt-4o-mini-audio-preview': gpt_4o_mini_audio_preview,
  'gpt-4o-mini-tts': gpt_4o_mini_tts,
  'gpt-4o-transcribe': gpt_4o_transcribe,
  'gpt-4o-transcribe-diarize': gpt_4o_transcribe_diarize,
  'gpt-4o-mini-transcribe': gpt_4o_mini_transcribe,
  'o4-mini': o4_mini,
  'o4-mini-deep-research': o4_mini_deep_research,
  'o3': o3,
  'o3-mini': o3_mini,
  'o3-pro': o3_pro,
  'o3-deep-research': o3_deep_research,
  'o1': o1,
  'o1-pro': o1_pro,
  'gpt-5-search-api': gpt_5_search_api,
  'computer-use-preview': computer_use_preview,
  'text-embedding-3-large': text_embedding_3_large,
  'text-embedding-3-small': text_embedding_3_small,
  'gpt-image-1': gpt_image_1,
  'gpt-image-1-mini': gpt_image_1_mini,
  'sora-2': sora_2,
  'sora-2-pro': sora_2_pro,
  'whisper-1': whisper_1,
  'tts-1': tts_1,
  'tts-1-hd': tts_1_hd,
  'omni-moderation-latest': omni_moderation_latest,
};

/** OpenAI provider definition */
export const provider: ProviderDefinition = defineProvider({
  ...{
  id: 'openai',
  name: 'OpenAI',
  category: 'official',
  apiFormat: 'openai-responses',
  baseUrl: 'https://api.openai.com/v1',
  docsUrl: 'https://platform.openai.com/docs',
  pricingUrl: 'https://openai.com/api/pricing',
  statusUrl: 'https://status.openai.com/',
  auth: {
    type: 'bearer',
    header: 'Authorization',
    prefix: 'Bearer ',
    envVar: 'OPENAI_API_KEY',
  },
},
  models,
});

export default provider;

// Re-export individual models
export {
  gpt_5_1,
  gpt_5,
  gpt_5_1_chat_latest,
  gpt_5_1_codex,
  gpt_5_1_codex_mini,
  gpt_5_codex,
  gpt_5_mini,
  gpt_5_nano,
  gpt_5_pro,
  gpt_4_1,
  gpt_4_1_mini,
  gpt_4_1_nano,
  gpt_4o,
  gpt_4o_2024_05_13,
  gpt_4o_mini,
  gpt_4o_search_preview,
  gpt_4o_mini_search_preview,
  chatgpt_4o_latest,
  gpt_realtime,
  gpt_realtime_mini,
  gpt_4o_realtime_preview,
  gpt_4o_mini_realtime_preview,
  gpt_audio,
  gpt_audio_mini,
  gpt_4o_audio_preview,
  gpt_4o_mini_audio_preview,
  gpt_4o_mini_tts,
  gpt_4o_transcribe,
  gpt_4o_transcribe_diarize,
  gpt_4o_mini_transcribe,
  o4_mini,
  o4_mini_deep_research,
  o3,
  o3_mini,
  o3_pro,
  o3_deep_research,
  o1,
  o1_pro,
  gpt_5_search_api,
  computer_use_preview,
  text_embedding_3_large,
  text_embedding_3_small,
  gpt_image_1,
  gpt_image_1_mini,
  sora_2,
  sora_2_pro,
  whisper_1,
  tts_1,
  tts_1_hd,
  omni_moderation_latest,
};

// Re-export defaults for external use
export * from './_defaults';
