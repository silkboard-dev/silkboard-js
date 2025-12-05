/**
 * Gemini 1.5 Pro (Vertex)
 * 
 * vertex model: gemini-1.5-pro
 * 
 * @see {@link https://platform.vertex.com/docs}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withVertexDefaults } from '../_defaults';

const gemini_1_5_pro: ModelDefinition = withVertexDefaults(defineModel({
  id: 'gemini-1.5-pro',
  name: 'Gemini 1.5 Pro (Vertex)',
  type: 'chat',
  family: 'gemini',
  status: 'ga',
  contextWindow: {
    input: 0,
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
      input: 0,
    },
  },
  capabilities: {},
  features: {},
}));

export default gemini_1_5_pro;
