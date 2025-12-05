/**
 * Z.ai GLM 4.6
 *
 * High-end GLM 4.6 coding model from Zhipu AI, hosted on Cerebras Inference.
 *
 * @see {@link https://inference-docs.cerebras.ai/models/zai-glm-46}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withCerebrasDefaults } from '../_defaults';

const zai_glm_4_6: ModelDefinition = withCerebrasDefaults(defineModel({
  id: 'zai-glm-4.6',
  name: 'ZAI GLM 4.6',
  type: 'chat',
  family: 'glm',
  status: 'preview',
  description: 'GLM 4.6 preview model for advanced coding and agentic tooling on Cerebras Inference.',
  releaseDate: '2025-11-18', // From Cerebras GLM 4.6 launch blog
  aliases: ['zai-org/GLM-4.6'],
  contextWindow: {
    input: 131_000, // Paid tiers context limit from Cerebras model page
    output: 40_000, // Paid tiers max output tokens from Cerebras model page
  },
  modalities: {
    input: { text: true },
    output: { text: true },
  },
  pricing: {
    standard: {
      input: 2.25,
      output: 2.75,
    },
  },
  rateLimits: {
    free: {
      rpm: 10,
      tpm: 150_000,
      tpd: 1_000_000,
    },
    developer: {
      rpm: 250,
      tpm: 250_000,
    },
  },
  capabilities: {
    streaming: true,
  },
  features: {},
  reasoning: {
    supported: true,
    type: 'extended_thinking',
    defaultEnabled: true,
    budgetTokens: {
      min: 1_024, // UNAVAILABLE: Exact thinking token budget not documented; based on typical reasoning ranges
      max: 64_000, // UNAVAILABLE: Derived from recommended high max_completion_tokens in Cerebras docs
      default: 16_000, // UNAVAILABLE: Estimated balanced default for complex tasks
    },
  },
}));

export default zai_glm_4_6;
