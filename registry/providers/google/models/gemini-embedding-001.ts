/**
 * Gemini Embedding 001
 * 
 * Latest Gemini embedding model with Matryoshka representation learning for flexible dimensions
 * 
 * @see {@link https://platform.google.com/docs}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withGoogleDefaults } from '../_defaults';

const gemini_embedding_001: ModelDefinition = withGoogleDefaults(defineModel({
  id: 'gemini-embedding-001',
  name: 'Gemini Embedding 001',
  type: 'embedding',
  family: 'gemini-embedding',
  status: 'ga',
  description: 'Latest Gemini embedding model with Matryoshka representation learning for flexible dimensions',
  releaseDate: '2025-03-01',
  contextWindow: {
    input: 8192,
  },
  modalities: {
    input: {
      text: true,
    },
    output: {
      embedding: true,
    },
  },
  pricing: {
    standard: {
      input: 0,
    },
    batch: {
      input: 0.0075,
      discountPercent: 50,
    },
  },
  capabilities: {
    embeddings: true,
  },
  features: {},
  rateLimits: {
    free: {
      rpm: 100,
      tpm: 30_000,
      rpd: 1000,
    },
    tier1: {
      rpm: 3000,
      tpm: 1_000_000,
    },
    tier2: {
      rpm: 5000,
      tpm: 5_000_000,
    },
    tier3: {
      rpm: 10_000,
      tpm: 10_000_000,
    },
  },
}));

export default gemini_embedding_001;
