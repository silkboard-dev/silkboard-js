/**
 * DeepSeek R1 Distill Llama 70B (via Chutes)
 *
 * chutes model: deepseek-ai/DeepSeek-R1-Distill-Llama-70B
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withChutesDefaults } from '../_defaults';

const deepseek_r1_distill_llama_70b: ModelDefinition = withChutesDefaults(defineModel({
  id: 'deepseek-ai/DeepSeek-R1-Distill-Llama-70B',
  name: 'DeepSeek R1 Distill Llama 70B',
  type: 'chat',
  family: 'chutes',
  status: 'ga',
  description: 'DeepSeek R1 Distill Llama 70B served via Chutes llm gateway.',
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

export default deepseek_r1_distill_llama_70b;

