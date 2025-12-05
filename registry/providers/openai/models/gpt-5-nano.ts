/**
 * GPT-5 Nano
 * 
 * Lowest-cost GPT-5 variant
 * 
 * @see {@link https://platform.openai.com/docs}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withOpenaiDefaults } from '../_defaults';

const gpt_5_nano: ModelDefinition = withOpenaiDefaults(defineModel({
  id: 'gpt-5-nano',
  name: 'GPT-5 Nano',
  type: 'chat',
  family: 'gpt-5',
  status: 'ga',
  description: 'Lowest-cost GPT-5 variant',
  architecture: {
    trainingCutoff: '2024-09-30',
  },
  contextWindow: {
    input: 400_000,
    output: 128_000,
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
      input: 0.05,
      output: 0.4,
      cachedInput: 0.005,
    },
  },
  capabilities: {
    streaming: true,
    functionCalling: true,
    parallelToolCalls: true,
    structuredOutput: true,
    jsonMode: true,
    systemPrompt: true,
    seed: true,
    stopSequences: true,
  },
  features: {
    promptCaching: true,
    batchApi: true,
    realtimeApi: true,
    assistantsApi: true,
  },
}));

export default gpt_5_nano;
