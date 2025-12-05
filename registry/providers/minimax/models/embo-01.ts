/**
 * Embo 01
 * 
 * MiniMax embedding model
 * 
 * @see {@link https://platform.minimax.com/docs}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withMinimaxDefaults } from '../_defaults';

const embo_01: ModelDefinition = withMinimaxDefaults(defineModel({
  id: 'embo-01',
  name: 'Embo 01',
  type: 'embedding',
  family: 'embo',
  status: 'ga',
  description: 'MiniMax embedding model',
  contextWindow: {
    input: 4096,
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
      input: 0.04,
    },
  },
  capabilities: {
    embeddings: true,
    dimensions: [1536],
  },
  features: {},
}));

export default embo_01;
