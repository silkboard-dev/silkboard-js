/**
 * GPT-4.1
 * 
 * Smartest non-reasoning GPT model with 1M context
 * 
 * @see {@link https://platform.openai.com/docs}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withOpenaiDefaults } from '../_defaults';

const gpt_4_1: ModelDefinition = withOpenaiDefaults(defineModel({
  id: 'gpt-4.1',
  name: 'GPT-4.1',
  type: 'chat',
  family: 'gpt-4.1',
  status: 'ga',
  description: 'Smartest non-reasoning GPT model with 1M context',
  releaseDate: '2025-04-14',
  architecture: {
    trainingCutoff: '2024-06-01',
  },
  contextWindow: {
    input: 1_047_576,
    output: 32_768,
  },
  modalities: {
    input: {
      text: true,
      image: true,
      file: true,
    },
    output: {
      text: true,
    },
  },
  pricing: {
    standard: {
      input: 2,
      output: 8,
      cachedInput: 0.5,
    },
  },
  capabilities: {
    streaming: true,
    functionCalling: true,
    parallelToolCalls: true,
    structuredOutput: true,
    jsonMode: true,
    systemPrompt: true,
    logprobs: true,
    seed: true,
    stopSequences: true,
  },
  features: {
    webSearch: true,
    fileSearch: true,
    codeInterpreter: true,
    imageGeneration: false,
    computerUse: false,
    mcp: true,
    fineTuning: true,
    distillation: true,
    promptCaching: true,
    batchApi: true,
    realtimeApi: true,
    assistantsApi: true,
  },
}));

export default gpt_4_1;
