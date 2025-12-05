/**
 * GPT-5.1 Chat (latest)
 * 
 * Chat-focused GPT-5.1 snapshot with structured outputs and tools
 * 
 * @see {@link https://platform.openai.com/docs}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withOpenaiDefaults } from '../_defaults';

const gpt_5_1_chat_latest: ModelDefinition = withOpenaiDefaults(defineModel({
  id: 'gpt-5.1-chat-latest',
  name: 'GPT-5.1 Chat (latest)',
  type: 'chat',
  family: 'gpt-5',
  status: 'ga',
  description: 'Chat-focused GPT-5.1 snapshot with structured outputs and tools',
  aliases: ['gpt-5-chat-latest'],
  architecture: {
    trainingCutoff: '2024-09-30',
  },
  contextWindow: {
    input: 128_000,
    output: 16_384,
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
      input: 1.25,
      output: 10,
      cachedInput: 0.125,
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
}));

export default gpt_5_1_chat_latest;
