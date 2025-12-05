/**
 * Qwen3 Reranker 4B
 *
 * Medium Qwen3 reranker model for document reranking.
 *
 * @see {@link https://docs.fireworks.ai/guides/querying-embeddings-models}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withFireworksDefaults } from '../_defaults';

const fireworks_qwen3_reranker_4b: ModelDefinition = withFireworksDefaults(
  defineModel({
    id: 'fireworks/qwen3-reranker-4b',
    name: 'Qwen3 Reranker 4B',
    type: 'rerank',
    family: 'fireworks/qwen3-reranker',
    status: 'ga',
    contextWindow: {
      input: 0, // TODO: Verify max tokens from Fireworks docs
      output: 0,
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
        output: 0,
      },
    },
    capabilities: {},
    features: {},
  }),
);

export default fireworks_qwen3_reranker_4b;

