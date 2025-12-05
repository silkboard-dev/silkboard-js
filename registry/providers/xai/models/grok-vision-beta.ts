/**
 * Grok Vision Beta
 * 
 * Legacy vision beta model. Consider migrating to grok-2-vision-1212 or newer.
 * 
 * @see {@link https://platform.xai.com/docs}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withXaiDefaults } from '../_defaults';

const grok_vision_beta: ModelDefinition = withXaiDefaults(defineModel({
  id: 'grok-vision-beta',
  name: 'Grok Vision Beta',
  type: 'chat',
  family: 'grok-beta',
  status: 'deprecated',
  description: 'Legacy vision beta model. Consider migrating to grok-2-vision-1212 or newer.',
  releaseDate: '2024-11',
  contextWindow: {
    input: 8192,
    output: 8192,
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
      input: 5,
      output: 15,
    },
  },
  capabilities: {
    streaming: true,
    functionCalling: true,
    systemPrompt: true,
  },
  features: {},
}));

export default grok_vision_beta;
