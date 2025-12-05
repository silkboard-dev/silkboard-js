/**
 * Gemini 1.5 Pro (via OpenRouter)
 * 
 * openrouter model: google/gemini-pro-1.5
 * 
 * @see {@link https://platform.openrouter.com/docs}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withOpenrouterDefaults } from '../_defaults';

const google_gemini_pro_1_5: ModelDefinition = withOpenrouterDefaults(defineModel({
  id: 'google/gemini-pro-1.5',
  name: 'Gemini 1.5 Pro (via OpenRouter)',
  type: 'chat',
  family: 'google/gemini',
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

export default google_gemini_pro_1_5;
