/**
 * GPT-4o Transcribe
 * 
 * Speech-to-text transcription using GPT-4o
 * 
 * @see {@link https://platform.openai.com/docs}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withOpenaiDefaults } from '../_defaults';

const gpt_4o_transcribe: ModelDefinition = withOpenaiDefaults(defineModel({
  id: 'gpt-4o-transcribe',
  name: 'GPT-4o Transcribe',
  type: 'audio-transcription',
  family: 'gpt-4o',
  status: 'preview',
  description: 'Speech-to-text transcription using GPT-4o',
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
      input: 2.5,
      output: 10,
    },
  },
  capabilities: {},
  features: {
    batchApi: true,
    assistantsApi: true,
  },
}));

export default gpt_4o_transcribe;
