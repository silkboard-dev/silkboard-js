import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withAlibabaDefaults } from '../_defaults';

const qwen3_asr_flash: ModelDefinition = withAlibabaDefaults(defineModel({
  id: 'qwen3-asr-flash',
  name: 'qwen3-asr-flash',
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
  features: {},
}));

export default qwen3_asr_flash;

