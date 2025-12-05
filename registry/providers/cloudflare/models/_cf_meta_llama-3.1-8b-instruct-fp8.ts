/**
 * Llama 3.1 8B Instruct (FP8)
 *
 * cloudflare model: @cf/meta/llama-3.1-8b-instruct-fp8
 *
 * @see {@link https://developers.cloudflare.com/workers-ai/models/}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withCloudflareDefaults } from '../_defaults';

const _cf_meta_llama_3_1_8b_instruct_fp8: ModelDefinition = withCloudflareDefaults(defineModel({
  id: '@cf/meta/llama-3.1-8b-instruct-fp8',
  name: 'Llama 3.1 8B Instruct (FP8)',
  type: 'chat',
  family: '@cf/meta/llama',
  status: 'ga',
  contextWindow: {
    input: 0, // TODO: Verify context window from provider docs
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

export default _cf_meta_llama_3_1_8b_instruct_fp8;
