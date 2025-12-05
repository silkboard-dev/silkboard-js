/**
 * Qwen 3 32B
 *
 * Dense 32B Qwen3 model from Alibaba, hosted on Cerebras Inference.
 *
 * @see {@link https://inference-docs.cerebras.ai/models/qwen-3-32b}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withCerebrasDefaults } from '../_defaults';

const qwen_3_32b: ModelDefinition = withCerebrasDefaults(defineModel({
  id: 'qwen-3-32b',
  name: 'Qwen 3 32B',
  type: 'chat',
  family: 'qwen3',
  status: 'ga',
  description: 'Qwen 3 32B dense model for complex chat, coding, and analysis workloads on Cerebras Inference.',
  aliases: ['Qwen/Qwen3-32B'],
  contextWindow: {
    input: 131_000, // Paid tiers context limit from Cerebras model page
    output: 8_000, // Paid tiers max output tokens from Cerebras model page
  },
  modalities: {
    input: { text: true },
    output: { text: true },
  },
  pricing: {
    standard: {
      input: 0.40,
      output: 0.80,
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
    type: 'extended_thinking',
    defaultEnabled: true,
    budgetTokens: {
      min: 1_024, // UNAVAILABLE: Exact thinking token budget not documented; based on typical reasoning configs
      max: 32_768, // UNAVAILABLE: Derived from Qwen3 recommended output lengths
      default: 8_192, // UNAVAILABLE: Estimated balanced default for hybrid thinking use
    },
  },
}));

export default qwen_3_32b;
