/**
 * Qwen3 Embedding 8B
 *
 * Large Qwen3 embeddings model, available on Fireworks.
 *
 * @see {@link https://docs.fireworks.ai/guides/querying-embeddings-models}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withFireworksDefaults } from '../_defaults';

const fireworks_qwen3_embedding_8b: ModelDefinition = withFireworksDefaults(
  defineModel({
    id: 'fireworks/qwen3-embedding-8b',
    name: 'Qwen3 Embedding 8B',
    type: 'embedding',
    family: 'fireworks/qwen3-embedding',
    status: 'ga',
    contextWindow: {
      input: 0, // TODO: Verify max tokens from Fireworks docs
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
        input: 0, // TODO: Fill in pricing from Fireworks pricing page
      },
    },
    capabilities: {
      embeddings: true,
      dimensions: [], // TODO: Verify embedding dimensions from Fireworks docs
    },
    features: {},
  }),
);

export default fireworks_qwen3_embedding_8b;

