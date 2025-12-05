import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withAlibabaDefaults } from '../_defaults';

const qwen_deep_research: ModelDefinition = withAlibabaDefaults(defineModel({
  id: 'qwen-deep-research',
  name: 'qwen-deep-research',
  type: 'chat',
  family: 'qwen',
  status: 'ga',
  contextWindow: {
    input: 0, // TODO: Verify context window from docs
    output: 0, // TODO: Verify max output tokens from docs
  },
  modalities: {
    input: {
      text: true,
    },
    output: {
      text: true,
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
    deepResearch: true,
  },
}));

export default qwen_deep_research;

