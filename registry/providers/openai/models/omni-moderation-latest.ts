/**
 * Omni Moderation
 * 
 * Safety moderation model
 * 
 * @see {@link https://platform.openai.com/docs}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withOpenaiDefaults } from '../_defaults';

const omni_moderation_latest: ModelDefinition = withOpenaiDefaults(defineModel({
  id: 'omni-moderation-latest',
  name: 'Omni Moderation',
  type: 'moderation',
  family: 'moderation',
  status: 'ga',
  description: 'Safety moderation model',
  aliases: ['omni-moderation-2024-09-04'],
  releaseDate: '2024-09-04',
  architecture: {},
  contextWindow: {
    input: 0,
  },
  modalities: {
    input: {
      text: true,
      image: true,
    },
    output: {
      text: false,
    },
  },
  pricing: {
    standard: {
      input: 0,
    },
  },
  capabilities: {
    streaming: false,
  },
  features: {
    assistantsApi: true,
  },
}));

export default omni_moderation_latest;
