import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withAlibabaDefaults } from '../_defaults';

const qwen_tts: ModelDefinition = withAlibabaDefaults(defineModel({
  id: 'qwen-tts',
  name: 'qwen-tts',
  type: 'audio-speech',
  family: 'qwen',
  status: 'ga',
  contextWindow: {
    input: 0, // TODO: Verify text length limits from docs
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
  features: {},
}));

export default qwen_tts;

