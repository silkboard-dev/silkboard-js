import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withAlibabaDefaults } from '../_defaults';

const qwen_omni_turbo_realtime_latest: ModelDefinition = withAlibabaDefaults(defineModel({
  id: 'qwen-omni-turbo-realtime-latest',
  name: 'qwen-omni-turbo-realtime-latest',
  type: 'multimodal',
  family: 'qwen',
  status: 'ga',
  contextWindow: {
    input: 0, // TODO: Verify context window from docs
    output: 0, // TODO: Verify max output tokens from docs
  },
  modalities: {
    input: {
      text: true,
      audio: true,
      image: true,
      video: true,
    },
    output: {
      text: true,
      audio: true,
    },
  },
  pricing: {
    standard: {
      input: 0, // TODO: pricing
      output: 0, // TODO: pricing
    },
  },
  capabilities: {},
  features: {
    realtimeApi: true,
  },
}));

export default qwen_omni_turbo_realtime_latest;

