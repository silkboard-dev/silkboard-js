/**
 * Qwen 3 235B A22B Instruct 2507
 *
 * Non-thinking Qwen3 235B Instruct variant hosted on Cerebras Inference.
 *
 * @see {@link https://inference-docs.cerebras.ai/models/qwen-3-235b-2507}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withCerebrasDefaults } from '../_defaults';

const qwen_3_235b_a22b_instruct_2507: ModelDefinition = withCerebrasDefaults(defineModel({
  id: 'qwen-3-235b-a22b-instruct-2507',
  name: 'Qwen 3 235B A22B Instruct 2507',
  type: 'chat',
  family: 'qwen3',
  status: 'preview',
  description: 'Qwen 3 235B A22B Instruct 2507 non-thinking model for high-intelligence multilingual chat, coding, and tools on Cerebras Inference.',
  releaseDate: '2025-07-29', // From Cerebras Qwen3 235B 2507 Instruct launch blog
  aliases: ['Qwen/Qwen3-235B-A22B-Instruct-2507'],
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
      input: 0.60,
      output: 1.20,
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
}));

export default qwen_3_235b_a22b_instruct_2507;
