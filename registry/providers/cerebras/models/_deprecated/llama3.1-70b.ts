/**
 * Llama 3.1 70B
 * 
 * Llama 3.1 70B on Cerebras inference
 * 
 * @see {@link https://platform.cerebras.com/docs}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withCerebrasDefaults } from '../_defaults';

const llama3_1_70b: ModelDefinition = withCerebrasDefaults(defineModel({
  id: 'llama3.1-70b',
  name: 'Llama 3.1 70B',
  type: 'chat',
  family: 'llama3.1',
  status: 'deprecated',
  description: 'Llama 3.1 70B on Cerebras inference (deprecated)',
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
      input: 0, // TODO: Add pricing
      output: 0, // TODO: Add pricing
    },
  },
  capabilities: {},
  features: {},
}));

export default llama3_1_70b;
