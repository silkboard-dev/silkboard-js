/**
 * GPT Realtime Mini
 * 
 * Lower-cost realtime multimodal model
 * 
 * @see {@link https://platform.openai.com/docs}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withOpenaiDefaults } from '../_defaults';

const gpt_realtime_mini: ModelDefinition = withOpenaiDefaults(defineModel({
  id: 'gpt-realtime-mini',
  name: 'GPT Realtime Mini',
  type: 'chat',
  family: 'gpt-realtime',
  status: 'preview',
  description: 'Lower-cost realtime multimodal model',
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
    },
    output: {
      text: true,
      audio: true,
    },
  },
  pricing: {
    standard: {
      input: 0.6,
      output: 2.4,
      cachedInput: 0.06,
    },
    modality: {
      text: {
        input: 0.6,
        output: 2.4,
        cachedInput: 0.06,
      },
      audio: {
        input: 10,
        output: 20,
        cachedInput: 0.3,
      },
      image: {
        input: 0.8,
        cachedInput: 0.08,
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
  },
  features: {
    realtimeApi: true,
    assistantsApi: true,
  },
}));

export default gpt_realtime_mini;
