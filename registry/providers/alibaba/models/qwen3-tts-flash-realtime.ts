import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withAlibabaDefaults } from '../_defaults';

const qwen3_tts_flash_realtime: ModelDefinition = withAlibabaDefaults(defineModel({
  id: 'qwen3-tts-flash-realtime',
  name: 'qwen3-tts-flash-realtime',
  type: 'audio-speech',
  family: 'qwen',
  status: 'ga',
  contextWindow: {
    input: 0, // TODO: Verify request limits from docs
  },
  modalities: {
    input: {
      text: true,
    },
    output: {
      audio: true,
    },
  },
  pricing: {
    standard: {
      input: 0, // TODO: pricing
    },
  },
  capabilities: {},
  features: {
    realtimeApi: true,
  },
}));

export default qwen3_tts_flash_realtime;

