/**
 * Text Embedding 3 Large
 * 
 * Highest quality embedding model
 * 
 * @see {@link https://platform.openai.com/docs}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withOpenaiDefaults } from '../_defaults';

const text_embedding_3_large: ModelDefinition = withOpenaiDefaults(defineModel({
  id: 'text-embedding-3-large',
  name: 'Text Embedding 3 Large',
  type: 'embedding',
  family: 'text-embedding-3',
  status: 'ga',
  description: 'Highest quality embedding model',
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
      input: 0.13,
    },
    batch: {
      input: 0.065,
      discountPercent: 50,
    },
  },
  capabilities: {
    embeddings: true,
    dimensions: [256, 1024, 3072],
  },
  features: {},
}));

export default text_embedding_3_large;
