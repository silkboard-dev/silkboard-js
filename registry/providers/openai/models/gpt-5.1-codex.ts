/**
 * GPT-5.1 Codex
 * 
 * GPT-5.1 tuned for long-running and agentic coding
 * 
 * @see {@link https://platform.openai.com/docs}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withOpenaiDefaults } from '../_defaults';

const gpt_5_1_codex: ModelDefinition = withOpenaiDefaults(defineModel({
  id: 'gpt-5.1-codex',
  name: 'GPT-5.1 Codex',
  type: 'chat',
  family: 'gpt-5',
  status: 'ga',
  description: 'GPT-5.1 tuned for long-running and agentic coding',
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
    imageGeneration: false,
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

export default gpt_5_1_codex;
