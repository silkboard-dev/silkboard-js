import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withAlibabaDefaults } from '../_defaults';

const qwen3_asr_flash_realtime: ModelDefinition = withAlibabaDefaults(defineModel({
  id: 'qwen3-asr-flash-realtime',
  name: 'qwen3-asr-flash-realtime',
  type: 'audio-transcription',
  family: 'qwen',
  status: 'ga',
  contextWindow: {
    input: 0, // TODO: Verify audio duration limits from docs
  },
  modalities: {
    input: {
      audio: true,
    },
    output: {
      text: true,
    },
  },
  pricing: {
    standard: {
      input: 0, // TODO: pricing
      output: 0, // TODO: pricing (if output tokens metered)
    },
  },
  capabilities: {},
  features: {
    realtimeApi: true,
  },
}));

export default qwen3_asr_flash_realtime;

