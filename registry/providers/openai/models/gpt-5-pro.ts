/**
 * GPT-5 Pro
 * 
 * Premium GPT-5 with extended thinking time
 * 
 * @see {@link https://platform.openai.com/docs}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withOpenaiDefaults } from '../_defaults';

const gpt_5_pro: ModelDefinition = withOpenaiDefaults(defineModel({
  id: 'gpt-5-pro',
  name: 'GPT-5 Pro',
  type: 'chat',
  family: 'gpt-5',
  status: 'ga',
  description: 'Premium GPT-5 with extended thinking time',
  architecture: {
    trainingCutoff: '2024-09-30',
  },
  contextWindow: {
    input: 0,
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
      input: 15,
      output: 120,
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
    webSearch: true,
    fileSearch: true,
    codeInterpreter: true,
    promptCaching: true,
    batchApi: true,
    realtimeApi: true,
    assistantsApi: true,
  },
}));

export default gpt_5_pro;
