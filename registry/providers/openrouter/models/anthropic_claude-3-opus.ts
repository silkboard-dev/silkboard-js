/**
 * Claude 3 Opus (via OpenRouter)
 * 
 * openrouter model: anthropic/claude-3-opus
 * 
 * @see {@link https://platform.openrouter.com/docs}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withOpenrouterDefaults } from '../_defaults';

const anthropic_claude_3_opus: ModelDefinition = withOpenrouterDefaults(defineModel({
  id: 'anthropic/claude-3-opus',
  name: 'Claude 3 Opus (via OpenRouter)',
  type: 'chat',
  family: 'anthropic/claude',
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

export default anthropic_claude_3_opus;
