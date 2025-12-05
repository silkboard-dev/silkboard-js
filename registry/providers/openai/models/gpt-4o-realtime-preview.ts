/**
 * GPT-4o Realtime Preview
 * 
 * GPT-4o realtime preview model
 * 
 * @see {@link https://platform.openai.com/docs}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withOpenaiDefaults } from '../_defaults';

const gpt_4o_realtime_preview: ModelDefinition = withOpenaiDefaults(defineModel({
  id: 'gpt-4o-realtime-preview',
  name: 'GPT-4o Realtime Preview',
  type: 'chat',
  family: 'gpt-4o',
  status: 'preview',
  description: 'GPT-4o realtime preview model',
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
      input: 5,
      output: 20,
      cachedInput: 2.5,
    },
    modality: {
      text: {
        input: 5,
        output: 20,
        cachedInput: 2.5,
      },
      audio: {
        input: 40,
        output: 80,
        cachedInput: 2.5,
      },
    },
  },
  capabilities: {
    streaming: true,
    functionCalling: true,
    structuredOutput: true,
    systemPrompt: true,
  },
  features: {
    realtimeApi: true,
  },
}));

export default gpt_4o_realtime_preview;
