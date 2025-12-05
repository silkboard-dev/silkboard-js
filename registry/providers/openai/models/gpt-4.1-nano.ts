/**
 * GPT-4.1 Nano
 * 
 * Ultra-low cost GPT-4.1 variant
 * 
 * @see {@link https://platform.openai.com/docs}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withOpenaiDefaults } from '../_defaults';

const gpt_4_1_nano: ModelDefinition = withOpenaiDefaults(defineModel({
  id: 'gpt-4.1-nano',
  name: 'GPT-4.1 Nano',
  type: 'chat',
  family: 'gpt-4.1',
  status: 'ga',
  description: 'Ultra-low cost GPT-4.1 variant',
  releaseDate: '2025-04-14',
  architecture: {
    trainingCutoff: '2024-06-01',
  },
  contextWindow: {
    input: 1_000_000,
    output: 32_768,
  },
  modalities: {
    input: {
      text: true,
      image: true,
    },
    output: {
      text: true,
    },
  },
  pricing: {
    standard: {
      input: 0.1,
      output: 0.4,
      cachedInput: 0.025,
    },
  },
  capabilities: {
    streaming: true,
    functionCalling: true,
    structuredOutput: true,
    jsonMode: true,
    systemPrompt: true,
    seed: true,
    stopSequences: true,
  },
  features: {
    webSearch: true,
    fileSearch: true,
    promptCaching: true,
    batchApi: true,
    realtimeApi: true,
    assistantsApi: true,
  },
}));

export default gpt_4_1_nano;
