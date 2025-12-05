/**
 * Llama 3.1 70B Instruct
 * 
 * Llama 3.1 70B on Baseten
 * 
 * @see {@link https://platform.baseten.com/docs}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withBasetenDefaults } from '../_defaults';

const llama_3_1_70b_instruct: ModelDefinition = withBasetenDefaults(defineModel({
  id: 'llama-3.1-70b-instruct',
  name: 'Llama 3.1 70B Instruct',
  type: 'chat',
  family: 'llama',
  status: 'ga',
  description: 'Llama 3.1 70B on Baseten',
  contextWindow: {
    input: 131_072,
    output: 4096,
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
      input: 0.9,
      output: 0.9,
    },
    notes: 'Pricing varies by deployment configuration',
  },
  capabilities: {
    functionCalling: true,
    streaming: true,
    systemPrompt: true,
  },
  features: {},
}));

export default llama_3_1_70b_instruct;
