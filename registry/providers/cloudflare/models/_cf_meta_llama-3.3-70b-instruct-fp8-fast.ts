/**
 * Llama 3.3 70B Instruct
 * 
 * cloudflare model: @cf/meta/llama-3.3-70b-instruct-fp8-fast
 * 
 * @see {@link https://platform.cloudflare.com/docs}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withCloudflareDefaults } from '../_defaults';

const _cf_meta_llama_3_3_70b_instruct_fp8_fast: ModelDefinition = withCloudflareDefaults(defineModel({
  id: '@cf/meta/llama-3.3-70b-instruct-fp8-fast',
  name: 'Llama 3.3 70B Instruct',
  type: 'chat',
 family: '@cf/meta/llama',
  status: 'ga',
  contextWindow: {
    input: 0, // TODO: Fill in provider-published context length
  },
  modalities: {
    input: {
      text: true,
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

export default _cf_meta_llama_3_3_70b_instruct_fp8_fast;
