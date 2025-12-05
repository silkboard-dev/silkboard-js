/**
 * Nomic Embed Text v1.5
 * 
 * fireworks model: nomic-ai/nomic-embed-text-v1.5
 * 
 * @see {@link https://docs.fireworks.ai/}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withFireworksDefaults } from '../_defaults';

const nomic_ai_nomic_embed_text_v1_5: ModelDefinition = withFireworksDefaults(defineModel({
  id: 'nomic-ai/nomic-embed-text-v1.5',
  name: 'Nomic Embed Text v1.5',
  type: 'embedding',
  family: 'nomic',
  status: 'ga',
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
      input: 0, // TODO: Verify pricing
    },
  },
  capabilities: {
    embeddings: true,
    dimensions: [], // TODO: Verify embedding dimensions
  },
  features: {},
}));

export default nomic_ai_nomic_embed_text_v1_5;
