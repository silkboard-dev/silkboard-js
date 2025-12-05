/**
 * Text Embedding 004
 * 
 * Previous generation text embedding model
 * 
 * @see {@link https://platform.google.com/docs}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withGoogleDefaults } from '../_defaults';

const text_embedding_004: ModelDefinition = withGoogleDefaults(defineModel({
  id: 'text-embedding-004',
  name: 'Text Embedding 004',
  type: 'embedding',
  family: 'text-embedding',
  status: 'ga',
  description: 'Previous generation text embedding model',
  releaseDate: '2024-03-01',
  contextWindow: {
    input: 2048,
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
  },
  capabilities: {
    embeddings: true,
  },
  features: {},
}));

export default text_embedding_004;
