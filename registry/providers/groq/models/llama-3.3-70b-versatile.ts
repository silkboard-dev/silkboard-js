/**
 * Llama 3.3 70B Versatile
 * 
 * Latest Llama 3.3 70B on Groq
 * 
 * @see {@link https://platform.groq.com/docs}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withGroqDefaults } from '../_defaults';

const llama_3_3_70b_versatile: ModelDefinition = withGroqDefaults(defineModel({
  id: 'llama-3.3-70b-versatile',
  name: 'Llama 3.3 70B Versatile',
  type: 'chat',
  family: 'llama',
  status: 'ga',
  description: 'Latest Llama 3.3 70B on Groq',
  contextWindow: {
    input: 128_000,
    output: 32_768,
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
      input: 0.59,
      output: 0.79,
    },
  },
  capabilities: {
    vision: false,
    functionCalling: true,
    structuredOutput: true,
    streaming: true,
    systemPrompt: true,
  },
  features: {},
}));

export default llama_3_3_70b_versatile;
