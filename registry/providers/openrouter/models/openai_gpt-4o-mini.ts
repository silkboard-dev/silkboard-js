/**
 * GPT-4o Mini (via OpenRouter)
 * 
 * openrouter model: openai/gpt-4o-mini
 * 
 * @see {@link https://platform.openrouter.com/docs}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withOpenrouterDefaults } from '../_defaults';

const openai_gpt_4o_mini: ModelDefinition = withOpenrouterDefaults(defineModel({
  id: 'openai/gpt-4o-mini',
  name: 'GPT-4o Mini (via OpenRouter)',
  type: 'chat',
  family: 'openai/gpt',
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

export default openai_gpt_4o_mini;
