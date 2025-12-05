/**
 * GPT-4.1 Mini
 * 
 * Cost-effective GPT-4.1 variant
 * 
 * @see {@link https://platform.openai.com/docs}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withOpenaiDefaults } from '../_defaults';

const gpt_4_1_mini: ModelDefinition = withOpenaiDefaults(defineModel({
  id: 'gpt-4.1-mini',
  name: 'GPT-4.1 Mini',
  type: 'chat',
  family: 'gpt-4.1',
  status: 'ga',
  description: 'Cost-effective GPT-4.1 variant',
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
      input: 0.4,
      output: 1.6,
      cachedInput: 0.1,
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

export default gpt_4_1_mini;
