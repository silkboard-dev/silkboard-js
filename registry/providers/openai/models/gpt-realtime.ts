/**
 * GPT Realtime
 * 
 * Realtime multimodal model for low-latency voice and text
 * 
 * @see {@link https://platform.openai.com/docs}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withOpenaiDefaults } from '../_defaults';

const gpt_realtime: ModelDefinition = withOpenaiDefaults(defineModel({
  id: 'gpt-realtime',
  name: 'GPT Realtime',
  type: 'chat',
  family: 'gpt-realtime',
  status: 'preview',
  description: 'Realtime multimodal model for low-latency voice and text',
  architecture: {
    trainingCutoff: '2023-10-01',
  },
  contextWindow: {
    input: 0,
  },
  modalities: {
    input: {
      text: true,
      audio: true,
      image: true,
    },
    output: {
      text: true,
      audio: true,
    },
  },
  pricing: {
    standard: {
      input: 4,
      output: 16,
      cachedInput: 0.4,
    },
    modality: {
      text: {
        input: 4,
        output: 16,
        cachedInput: 0.4,
      },
      audio: {
        input: 32,
        output: 64,
        cachedInput: 0.4,
      },
      image: {
        input: 5,
        cachedInput: 0.5,
      },
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
  },
  features: {
    realtimeApi: true,
    webSearch: true,
    fileSearch: true,
    assistantsApi: true,
  },
}));

export default gpt_realtime;
