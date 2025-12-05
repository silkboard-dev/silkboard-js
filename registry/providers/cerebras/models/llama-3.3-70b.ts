/**
 * Llama 3.3 70B
 *
 * High-capacity Llama 3.3 70B Instruct model hosted on Cerebras Inference.
 *
 * @see {@link https://inference-docs.cerebras.ai/models/llama-33-70b}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withCerebrasDefaults } from '../_defaults';

const llama_3_3_70b: ModelDefinition = withCerebrasDefaults(defineModel({
  id: 'llama-3.3-70b',
  name: 'Llama 3.3 70B',
  type: 'chat',
  family: 'llama3.3',
  status: 'ga',
  description: '70B Llama 3.3 model for advanced chat, coding, and reasoning on Cerebras Inference.',
  releaseDate: '2024-12-06', // From Meta Llama 3.3 70B Instruct model card
  aliases: ['meta-llama/Llama-3.3-70B-Instruct'],
  contextWindow: {
    input: 128_000, // Paid tiers context limit from Cerebras model page
    output: 65_000, // Paid tiers max output tokens from Cerebras model page
  },
  modalities: {
    input: { text: true },
    output: { text: true },
  },
  pricing: {
    standard: {
      input: 0.85,
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

export default llama_3_3_70b;
