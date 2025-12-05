import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';
import { withBasetenDefaults } from '../_defaults';

const openai_gpt_oss_120b: ModelDefinition = withBasetenDefaults(defineModel({
  id: 'openai/gpt-oss-120b',
  name: 'GPT OSS 120B',
  type: 'chat',
  family: 'gpt-oss',
  status: 'ga',
  contextWindow: {
    input: 128_000,
  },
  modalities: {
    input: { text: true },
    output: { text: true },
  },
  pricing: {
    standard: {
      input: 0.10,
      output: 0.50,
    },
  },
  capabilities: {},
  features: {},
}));

export default openai_gpt_oss_120b;
