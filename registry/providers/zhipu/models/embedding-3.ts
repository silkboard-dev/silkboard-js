/**
 * Embedding 3
 * 
 * Latest GLM embedding model
 * 
 * @see {@link https://platform.zhipu.com/docs}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withZhipuDefaults } from '../_defaults';

const embedding_3: ModelDefinition = withZhipuDefaults(defineModel({
  id: 'embedding-3',
  name: 'Embedding 3',
  type: 'embedding',
  family: 'embedding',
  status: 'ga',
  description: 'Latest GLM embedding model',
  contextWindow: {
    input: 8192,
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
      input: 0.07,
    },
  },
  capabilities: {
    embeddings: true,
    dimensions: [2048],
  },
  features: {},
}));

export default embedding_3;
