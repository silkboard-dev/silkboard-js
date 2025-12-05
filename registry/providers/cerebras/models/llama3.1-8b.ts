/**
 * Llama 3.1 8B
 * 
 * Llama 3.1 8B on Cerebras Inference
 * 
 * @see {@link https://inference-docs.cerebras.ai/models/llama-31-8b}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withCerebrasDefaults } from '../_defaults';

const llama3_1_8b: ModelDefinition = withCerebrasDefaults(defineModel({
  id: 'llama3.1-8b',
  name: 'Llama 3.1 8B',
  type: 'chat',
  family: 'llama3.1',
  status: 'ga',
  description: 'Fast 8B Llama 3.1 model optimized for high-throughput, low-latency chat on Cerebras Inference.',
  releaseDate: '2024-08-27', // From Cerebras Inference launch blog
  aliases: ['meta-llama/Meta-Llama-3.1-8B-Instruct'],
  contextWindow: {
    input: 32_000, // Paid tiers context limit from Cerebras model page
    output: 8_000, // Max output tokens from Cerebras model page
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
      input: 0.10,
      output: 0.10,
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

export default llama3_1_8b;
