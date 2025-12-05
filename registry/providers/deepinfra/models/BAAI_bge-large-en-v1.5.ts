/**
 * BGE Large EN v1.5
 * 
 * deepinfra model: BAAI/bge-large-en-v1.5
 * 
 * @see {@link https://platform.deepinfra.com/docs}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withDeepinfraDefaults } from '../_defaults';

const BAAI_bge_large_en_v1_5: ModelDefinition = withDeepinfraDefaults(defineModel({
  id: 'BAAI/bge-large-en-v1.5',
  name: 'BGE Large EN v1.5',
  type: 'embedding',
  family: 'BAAI/bge',
  status: 'ga',
  contextWindow: {
    input: 0, // TODO: Verify max input tokens
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
      input: 0, // TODO: Add pricing per 1K input tokens
    },
  },
  capabilities: {
    embeddings: true,
    dimensions: [1024],
  },
  features: {},
}));

export default BAAI_bge_large_en_v1_5;
