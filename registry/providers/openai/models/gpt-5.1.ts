/**
 * GPT-5.1
 * 
 * Flagship GPT-5.1 model for coding, agentic tasks, and reasoning effort control
 * 
 * @see {@link https://platform.openai.com/docs}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withOpenaiDefaults } from '../_defaults';

const gpt_5_1: ModelDefinition = withOpenaiDefaults(defineModel({
  id: 'gpt-5.1',
  name: 'GPT-5.1',
  type: 'chat',
  family: 'gpt-5',
  status: 'ga',
  description: 'Flagship GPT-5.1 model for coding, agentic tasks, and reasoning effort control',
  aliases: ['gpt-5.1-2025-08-07'],
  releaseDate: '2025-08-07',
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
      audio: false,
      video: false,
      file: true,
    },
    output: {
      text: true,
      image: false,
      audio: false,
      video: false,
      embedding: false,
    },
  },
  pricing: {
    standard: {
      input: 1.25,
      output: 10,
      cachedInput: 0.125,
    },
    batch: {
      input: 0.625,
      output: 5,
      discountPercent: 50,
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
    imageGeneration: true,
    computerUse: false,
    mcp: true,
    fineTuning: false,
    distillation: true,
    promptCaching: true,
    batchApi: true,
    realtimeApi: true,
    assistantsApi: true,
  },
  reasoning: {
    supported: true,
    type: 'reasoning_effort',
    effortLevels: ['low', 'medium', 'high'],
  },
  caching: {
    supported: true,
    type: 'automatic',
    discountPercent: 50,
  },
}));

export default gpt_5_1;
