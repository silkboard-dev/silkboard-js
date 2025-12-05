/**
 * GPT-5.1 Codex Mini
 * 
 * Cost-optimized GPT-5.1 codex snapshot
 * 
 * @see {@link https://platform.openai.com/docs}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withOpenaiDefaults } from '../_defaults';

const gpt_5_1_codex_mini: ModelDefinition = withOpenaiDefaults(defineModel({
  id: 'gpt-5.1-codex-mini',
  name: 'GPT-5.1 Codex Mini',
  type: 'chat',
  family: 'gpt-5',
  status: 'ga',
  description: 'Cost-optimized GPT-5.1 codex snapshot',
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
      input: 0.25,
      output: 2,
      cachedInput: 0.025,
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
    mcp: true,
    promptCaching: true,
    batchApi: true,
    realtimeApi: true,
    assistantsApi: true,
  },
}));

export default gpt_5_1_codex_mini;
