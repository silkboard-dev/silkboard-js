/**
 * GPT-4o Mini Realtime Preview
 * 
 * Budget realtime variant of GPT-4o mini
 * 
 * @see {@link https://platform.openai.com/docs}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withOpenaiDefaults } from '../_defaults';

const gpt_4o_mini_realtime_preview: ModelDefinition = withOpenaiDefaults(defineModel({
  id: 'gpt-4o-mini-realtime-preview',
  name: 'GPT-4o Mini Realtime Preview',
  type: 'chat',
  family: 'gpt-4o',
  status: 'preview',
  description: 'Budget realtime variant of GPT-4o mini',
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
      cachedInput: 0.3,
    },
    modality: {
      text: {
        input: 0.6,
        output: 2.4,
        cachedInput: 0.3,
      },
      audio: {
        input: 10,
        output: 20,
        cachedInput: 0.3,
      },
    },
  },
  capabilities: {
    streaming: true,
    functionCalling: true,
    structuredOutput: true,
  },
  features: {
    realtimeApi: true,
  },
}));

export default gpt_4o_mini_realtime_preview;
