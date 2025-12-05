/**
 * GPT-5 Codex
 * 
 * GPT-5 coding variant
 * 
 * @see {@link https://platform.openai.com/docs}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withOpenaiDefaults } from '../_defaults';

const gpt_5_codex: ModelDefinition = withOpenaiDefaults(defineModel({
  id: 'gpt-5-codex',
  name: 'GPT-5 Codex',
  type: 'chat',
  family: 'gpt-5',
  status: 'ga',
  description: 'GPT-5 coding variant',
  architecture: {
    trainingCutoff: '2024-09-30',
  },
  contextWindow: {
    input: 0,
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
    codeInterpreter: true,
    promptCaching: true,
    batchApi: true,
    realtimeApi: true,
    assistantsApi: true,
  },
}));

export default gpt_5_codex;
