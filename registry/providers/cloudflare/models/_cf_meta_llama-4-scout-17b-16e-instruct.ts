/**
 * Llama 4 Scout 17B 16E Instruct
 *
 * cloudflare model: @cf/meta/llama-4-scout-17b-16e-instruct
 *
 * @see {@link https://developers.cloudflare.com/workers-ai/models/}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withCloudflareDefaults } from '../_defaults';

const _cf_meta_llama_4_scout_17b_16e_instruct: ModelDefinition = withCloudflareDefaults(defineModel({
  id: '@cf/meta/llama-4-scout-17b-16e-instruct',
  name: 'Llama 4 Scout 17B 16E Instruct',
  type: 'chat',
  family: '@cf/meta/llama',
  status: 'ga',
  contextWindow: {
    input: 0, // TODO: Verify context window from provider docs
  },
  modalities: {
    input: {
      text: true,
      image: true, // TODO: Verify multimodal input availability
    },
    output: {
      text: true,
    },
  },
  pricing: {
    standard: {
      input: 0,
      output: 0, // TODO: Fill in provider-published rates
    },
  },
  capabilities: {},
  features: {},
}));

export default _cf_meta_llama_4_scout_17b_16e_instruct;
