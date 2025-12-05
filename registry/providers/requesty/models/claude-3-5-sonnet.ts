/**
 * Claude 3.5 Sonnet (via Requesty)
 * 
 * requesty model: claude-3-5-sonnet
 * 
 * @see {@link https://platform.requesty.com/docs}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withRequestyDefaults } from '../_defaults';

const claude_3_5_sonnet: ModelDefinition = withRequestyDefaults(defineModel({
  id: 'claude-3-5-sonnet',
  name: 'Claude 3.5 Sonnet (via Requesty)',
  type: 'chat',
  family: 'claude',
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

export default claude_3_5_sonnet;
