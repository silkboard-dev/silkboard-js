/**
 * Text Embedding 3 Small
 * 
 * Fast, low-cost embedding model
 * 
 * @see {@link https://platform.openai.com/docs}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withOpenaiDefaults } from '../_defaults';

const text_embedding_3_small: ModelDefinition = withOpenaiDefaults(defineModel({
  id: 'text-embedding-3-small',
  name: 'Text Embedding 3 Small',
  type: 'embedding',
  family: 'text-embedding-3',
  status: 'ga',
  description: 'Fast, low-cost embedding model',
  releaseDate: '2024-01-25',
  architecture: {
    trainingCutoff: '2021-09-01',
  },
  contextWindow: {
    input: 8191,
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
      input: 0.02,
    },
    batch: {
      input: 0.01,
      discountPercent: 50,
    },
  },
  capabilities: {
    embeddings: true,
    dimensions: [512, 1536],
  },
  features: {},
}));

export default text_embedding_3_small;
