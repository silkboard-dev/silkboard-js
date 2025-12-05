/**
 * Google AI Provider
 * 
 * @see {@link https://ai.google.dev/gemini-api/docs}
 */

import { defineProvider } from '../../base';
import type { ProviderDefinition, ModelDefinition } from '../../types';

import gemini_3_pro_preview from './models/gemini-3-pro-preview';
import gemini_3_pro_image_preview from './models/gemini-3-pro-image-preview';
import gemini_2_5_pro from './models/gemini-2.5-pro';
import gemini_2_5_flash from './models/gemini-2.5-flash';
import gemini_2_5_flash_preview_09_2025 from './models/gemini-2.5-flash-preview-09-2025';
import gemini_2_5_flash_lite from './models/gemini-2.5-flash-lite';
import gemini_2_5_flash_lite_preview_09_2025 from './models/gemini-2.5-flash-lite-preview-09-2025';
import gemini_2_5_flash_image from './models/gemini-2.5-flash-image';
import gemini_2_5_flash_preview_tts from './models/gemini-2.5-flash-preview-tts';
import gemini_2_0_flash from './models/gemini-2.0-flash';
import gemini_2_0_flash_lite from './models/gemini-2.0-flash-lite';
import gemini_2_0_flash_preview_image_generation from './models/gemini-2.0-flash-preview-image-generation';
import gemini_2_0_flash_live_001 from './models/gemini-2.0-flash-live-001';
import gemini_1_5_pro from './models/gemini-1.5-pro';
import gemini_1_5_flash from './models/gemini-1.5-flash';
import gemini_1_5_flash_8b from './models/gemini-1.5-flash-8b';
import gemini_2_5_flash_live from './models/gemini-2.5-flash-live';
import gemini_2_5_flash_preview_native_audio from './models/gemini-2.5-flash-preview-native-audio';
import gemini_embedding_001 from './models/gemini-embedding-001';
import text_embedding_004 from './models/text-embedding-004';
import imagen_4_0_generate_001 from './models/imagen-4.0-generate-001';
import imagen_4_0_ultra_generate_001 from './models/imagen-4.0-ultra-generate-001';
import imagen_4_0_fast_generate_001 from './models/imagen-4.0-fast-generate-001';
import imagen_3_0_generate_002 from './models/imagen-3.0-generate-002';
import veo_3_1 from './models/veo-3.1';
import veo_3_1_fast from './models/veo-3.1-fast';
import veo_3 from './models/veo-3';
import veo_3_fast from './models/veo-3-fast';
import veo_2 from './models/veo-2';
import lyria_realtime_exp from './models/lyria-realtime-exp';
import gemini_2_5_computer_use_preview from './models/gemini-2.5-computer-use-preview';
import gemini_robotics_er_1_5_preview from './models/gemini-robotics-er-1.5-preview';
import gemma_3 from './models/gemma-3';
import gemma_3n from './models/gemma-3n';

/** All Google AI models */
export const models: Record<string, ModelDefinition> = {
  'gemini-3-pro-preview': gemini_3_pro_preview,
  'gemini-3-pro-image-preview': gemini_3_pro_image_preview,
  'gemini-2.5-pro': gemini_2_5_pro,
  'gemini-2.5-flash': gemini_2_5_flash,
  'gemini-2.5-flash-preview-09-2025': gemini_2_5_flash_preview_09_2025,
  'gemini-2.5-flash-lite': gemini_2_5_flash_lite,
  'gemini-2.5-flash-lite-preview-09-2025': gemini_2_5_flash_lite_preview_09_2025,
  'gemini-2.5-flash-image': gemini_2_5_flash_image,
  'gemini-2.5-flash-preview-tts': gemini_2_5_flash_preview_tts,
  'gemini-2.0-flash': gemini_2_0_flash,
  'gemini-2.0-flash-lite': gemini_2_0_flash_lite,
  'gemini-2.0-flash-preview-image-generation': gemini_2_0_flash_preview_image_generation,
  'gemini-2.0-flash-live-001': gemini_2_0_flash_live_001,
  'gemini-1.5-pro': gemini_1_5_pro,
  'gemini-1.5-flash': gemini_1_5_flash,
  'gemini-1.5-flash-8b': gemini_1_5_flash_8b,
  'gemini-2.5-flash-live': gemini_2_5_flash_live,
  'gemini-2.5-flash-preview-native-audio': gemini_2_5_flash_preview_native_audio,
  'gemini-embedding-001': gemini_embedding_001,
  'text-embedding-004': text_embedding_004,
  'imagen-4.0-generate-001': imagen_4_0_generate_001,
  'imagen-4.0-ultra-generate-001': imagen_4_0_ultra_generate_001,
  'imagen-4.0-fast-generate-001': imagen_4_0_fast_generate_001,
  'imagen-3.0-generate-002': imagen_3_0_generate_002,
  'veo-3.1': veo_3_1,
  'veo-3.1-fast': veo_3_1_fast,
  'veo-3': veo_3,
  'veo-3-fast': veo_3_fast,
  'veo-2': veo_2,
  'lyria-realtime-exp': lyria_realtime_exp,
  'gemini-2.5-computer-use-preview': gemini_2_5_computer_use_preview,
  'gemini-robotics-er-1.5-preview': gemini_robotics_er_1_5_preview,
  'gemma-3': gemma_3,
  'gemma-3n': gemma_3n,
};

/** Google AI provider definition */
export const provider: ProviderDefinition = defineProvider({
  ...{
  id: 'google',
  name: 'Google AI',
  category: 'official',
  apiFormat: 'google-gemini',
  baseUrl: 'https://generativelanguage.googleapis.com/v1beta',
  docsUrl: 'https://ai.google.dev/gemini-api/docs',
  pricingUrl: 'https://ai.google.dev/gemini-api/docs/pricing',
  statusUrl: 'https://status.cloud.google.com/',
  auth: {
    type: 'api_key',
    header: 'x-goog-api-key',
    envVar: 'GEMINI_API_KEY',
  },
},
  models,
});

export default provider;

// Re-export individual models
export {
  gemini_3_pro_preview,
  gemini_3_pro_image_preview,
  gemini_2_5_pro,
  gemini_2_5_flash,
  gemini_2_5_flash_preview_09_2025,
  gemini_2_5_flash_lite,
  gemini_2_5_flash_lite_preview_09_2025,
  gemini_2_5_flash_image,
  gemini_2_5_flash_preview_tts,
  gemini_2_0_flash,
  gemini_2_0_flash_lite,
  gemini_2_0_flash_preview_image_generation,
  gemini_2_0_flash_live_001,
  gemini_1_5_pro,
  gemini_1_5_flash,
  gemini_1_5_flash_8b,
  gemini_2_5_flash_live,
  gemini_2_5_flash_preview_native_audio,
  gemini_embedding_001,
  text_embedding_004,
  imagen_4_0_generate_001,
  imagen_4_0_ultra_generate_001,
  imagen_4_0_fast_generate_001,
  imagen_3_0_generate_002,
  veo_3_1,
  veo_3_1_fast,
  veo_3,
  veo_3_fast,
  veo_2,
  lyria_realtime_exp,
  gemini_2_5_computer_use_preview,
  gemini_robotics_er_1_5_preview,
  gemma_3,
  gemma_3n,
};

// Re-export defaults for external use
export * from './_defaults';
