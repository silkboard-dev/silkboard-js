/**
 * GPT Audio Mini
 * 
 * Lower-cost GPT audio variant
 * 
 * @see {@link https://platform.openai.com/docs}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withOpenaiDefaults } from '../_defaults';

const gpt_audio_mini: ModelDefinition = withOpenaiDefaults(defineModel({
  id: 'gpt-audio-mini',
  name: 'GPT Audio Mini',
  type: 'chat',
  family: 'gpt-audio',
  status: 'preview',
  description: 'Lower-cost GPT audio variant',
  architecture: {},
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
    },
    modality: {
      text: {
        input: 0.6,
        output: 2.4,
      },
      audio: {
        input: 10,
        output: 20,
      },
    },
  },
  capabilities: {
    streaming: true,
    structuredOutput: true,
  },
  features: {
    realtimeApi: true,
  },
}));

export default gpt_audio_mini;
