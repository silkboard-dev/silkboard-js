/**
 * GPT-4o Mini Transcribe
 * 
 * Cost-optimized transcription
 * 
 * @see {@link https://platform.openai.com/docs}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withOpenaiDefaults } from '../_defaults';

const gpt_4o_mini_transcribe: ModelDefinition = withOpenaiDefaults(defineModel({
  id: 'gpt-4o-mini-transcribe',
  name: 'GPT-4o Mini Transcribe',
  type: 'audio-transcription',
  family: 'gpt-4o',
  status: 'preview',
  description: 'Cost-optimized transcription',
  architecture: {},
  contextWindow: {
    input: 0,
  },
  modalities: {
    input: {
      audio: true,
    },
    output: {
      text: true,
    },
  },
  pricing: {
    standard: {
      input: 1.25,
      output: 5,
    },
  },
  capabilities: {},
  features: {
    batchApi: true,
  },
}));

export default gpt_4o_mini_transcribe;
