/**
 * Text Embedding V3
 * 
 * Latest Qwen embedding model
 * 
 * @see {@link https://platform.alibaba.com/docs}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withAlibabaDefaults } from '../_defaults';

const text_embedding_v3: ModelDefinition = withAlibabaDefaults(defineModel({
  id: 'text-embedding-v3',
  name: 'Text Embedding V3',
  type: 'embedding',
  family: 'text',
  status: 'ga',
  description: 'Latest Qwen embedding model',
  contextWindow: {
    input: 0, // TODO: Verify context window
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
      input: 0, // TODO: pricing
    },
  },
  capabilities: {
    embeddings: true,
  },
  features: {},
}));

export default text_embedding_v3;
