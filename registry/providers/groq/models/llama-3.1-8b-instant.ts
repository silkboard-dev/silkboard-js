/**
 * Llama 3.1 8B Instant
 * 
 * Fast Llama 3.1 8B on Groq
 * 
 * @see {@link https://platform.groq.com/docs}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withGroqDefaults } from '../_defaults';

const llama_3_1_8b_instant: ModelDefinition = withGroqDefaults(defineModel({
  id: 'llama-3.1-8b-instant',
  name: 'Llama 3.1 8B Instant',
  type: 'chat',
  family: 'llama',
  status: 'ga',
  description: 'Fast Llama 3.1 8B on Groq',
  contextWindow: {
    input: 128_000,
    output: 8192,
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
      input: 0.05,
      output: 0.08,
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

export default llama_3_1_8b_instant;
