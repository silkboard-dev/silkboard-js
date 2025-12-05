/**
 * M2 BERT 80M 8K Retrieval
 * 
 * together model: togethercomputer/m2-bert-80M-8k-retrieval
 * 
 * @see {@link https://platform.together.com/docs}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withTogetherDefaults } from '../_defaults';

const togethercomputer_m2_bert_80M_8k_retrieval: ModelDefinition = withTogetherDefaults(defineModel({
  id: 'togethercomputer/m2-bert-80M-8k-retrieval',
  name: 'M2 BERT 80M 8K Retrieval',
  type: 'embedding',
  family: 'togethercomputer/m2',
  status: 'ga',
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
      input: 0.008,
    },
  },
  capabilities: {
    embeddings: true,
  },
  features: {},
}));

export default togethercomputer_m2_bert_80M_8k_retrieval;
