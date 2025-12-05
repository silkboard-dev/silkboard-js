/**
 * GPT-4o (via Requesty)
 * 
 * requesty model: gpt-4o
 * 
 * @see {@link https://platform.requesty.com/docs}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withRequestyDefaults } from '../_defaults';

const gpt_4o: ModelDefinition = withRequestyDefaults(defineModel({
  id: 'gpt-4o',
  name: 'GPT-4o (via Requesty)',
  type: 'chat',
  family: 'gpt',
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

export default gpt_4o;
