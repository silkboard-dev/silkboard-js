/**
 * Sora 2 Pro
 * 
 * Higher quality Sora video generation
 * 
 * @see {@link https://platform.openai.com/docs}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withOpenaiDefaults } from '../_defaults';

const sora_2_pro: ModelDefinition = withOpenaiDefaults(defineModel({
  id: 'sora-2-pro',
  name: 'Sora 2 Pro',
  type: 'video-generation',
  family: 'sora',
  status: 'preview',
  description: 'Higher quality Sora video generation',
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
      perSecond: 0.3,
    },
    notes: 'High-res option costs 0.50 per second',
  },
  capabilities: {},
  features: {},
}));

export default sora_2_pro;
