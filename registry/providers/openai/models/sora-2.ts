/**
 * Sora 2
 * 
 * Video generation model (portrait/landscape)
 * 
 * @see {@link https://platform.openai.com/docs}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withOpenaiDefaults } from '../_defaults';

const sora_2: ModelDefinition = withOpenaiDefaults(defineModel({
  id: 'sora-2',
  name: 'Sora 2',
  type: 'video-generation',
  family: 'sora',
  status: 'preview',
  description: 'Video generation model (portrait/landscape)',
  architecture: {},
  contextWindow: {
    input: 0,
  },
  modalities: {
    input: {
      text: true,
      image: true,
      video: true,
    },
    output: {
      video: true,
    },
  },
  pricing: {
    standard: {
      input: 0,
    },
    unit: {
      perSecond: 0.1,
    },
  },
  capabilities: {},
  features: {
    realtimeApi: false,
    assistantsApi: false,
  },
}));

export default sora_2;
