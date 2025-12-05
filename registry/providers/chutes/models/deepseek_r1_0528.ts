/**
 * DeepSeek R1 0528 (via Chutes)
 *
 * chutes model: deepseek-ai/DeepSeek-R1-0528
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withChutesDefaults } from '../_defaults';

const deepseek_r1_0528: ModelDefinition = withChutesDefaults(defineModel({
  id: 'deepseek-ai/DeepSeek-R1-0528',
  name: 'DeepSeek R1 0528',
  type: 'chat',
  family: 'chutes',
  status: 'ga',
  description: 'DeepSeek R1 0528 served via Chutes llm gateway.',
  contextWindow: {
    input: 0, // TODO: Fill in from llm.chutes.ai /v1/models context_length
  },
  modalities: {
    input: { text: true },
    output: { text: true },
  },
  pricing: {
    standard: {
      input: 0, // TODO: Fill in from llm.chutes.ai /v1/models pricing.prompt
      output: 0, // TODO: Fill in from llm.chutes.ai /v1/models pricing.completion
    },
  },
  capabilities: {},
  features: {},
  reasoning: {
    supported: false, // TODO: Confirm reasoning support based on supported_features.reasoning
  },
}));

export default deepseek_r1_0528;

