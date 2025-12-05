/**
 * GPT-4o (Azure)
 * 
 * azure model: gpt-4o
 * 
 * @see {@link https://platform.azure.com/docs}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withAzureDefaults } from '../_defaults';

const gpt_4o: ModelDefinition = withAzureDefaults(defineModel({
  id: 'gpt-4o',
  name: 'GPT-4o (Azure)',
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
