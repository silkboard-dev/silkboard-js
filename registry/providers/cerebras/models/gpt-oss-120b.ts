/**
 * OpenAI GPT OSS 120B
 *
 * OpenAI's 120B open-weight model hosted on Cerebras Inference.
 *
 * @see {@link https://inference-docs.cerebras.ai/models/openai-oss}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withCerebrasDefaults } from '../_defaults';

const gpt_oss_120b: ModelDefinition = withCerebrasDefaults(defineModel({
  id: 'gpt-oss-120b',
  name: 'GPT-OSS 120B',
  type: 'chat',
  family: 'gpt-oss',
  status: 'ga',
  description: 'OpenAI GPT OSS 120B open-weight model for advanced math, science, and coding workloads on Cerebras Inference.',
  releaseDate: '2025-08-05', // From OpenAI gpt-oss announcement
  aliases: ['openai/gpt-oss-120b'],
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
      input: 0.35,
      output: 0.75,
    },
  },
  rateLimits: {
    free: {
      rpm: 30,
      tpm: 60_000,
      tpd: 1_000_000,
    },
    developer: {
      rpm: 1_000,
      tpm: 1_000_000,
    },
  },
  capabilities: {
    streaming: true,
  },
  features: {},
  reasoning: {
    supported: true,
    type: 'reasoning_effort',
    defaultEnabled: true,
    effortLevels: ['low', 'medium', 'high'],
  },
}));

export default gpt_oss_120b;
