import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withAlibabaDefaults } from '../_defaults';

const text_embedding_v4: ModelDefinition = withAlibabaDefaults(defineModel({
  id: 'text-embedding-v4',
  name: 'text-embedding-v4',
  type: 'embedding',
  family: 'text',
  status: 'ga',
  contextWindow: {
    input: 0, // TODO: Verify max tokens per row from docs
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

export default text_embedding_v4;

