/**
 * Fireworks AI Provider
 * 
 * @see {@link https://docs.fireworks.ai/}
 */

import { defineProvider } from '../../base';
import type { ProviderDefinition, ModelDefinition } from '../../types';

import accounts_fireworks_models_llama_v3p3_70b_instruct from './models/accounts_fireworks_models_llama-v3p3-70b-instruct';
import accounts_fireworks_models_llama_v3p1_405b_instruct from './models/accounts_fireworks_models_llama-v3p1-405b-instruct';
import accounts_fireworks_models_llama_v3p1_70b_instruct from './models/accounts_fireworks_models_llama-v3p1-70b-instruct';
import accounts_fireworks_models_llama_v3p1_8b_instruct from './models/accounts_fireworks_models_llama-v3p1-8b-instruct';
import accounts_fireworks_models_deepseek_r1 from './models/accounts_fireworks_models_deepseek-r1';
import accounts_fireworks_models_deepseek_v3 from './models/accounts_fireworks_models_deepseek-v3';
import accounts_fireworks_models_deepseek_v3p1 from './models/accounts_fireworks_models_deepseek-v3p1';
import accounts_fireworks_models_firefunction_v1 from './models/accounts_fireworks_models_firefunction-v1';
import accounts_fireworks_models_kimi_k2_instruct_0905 from './models/accounts_fireworks_models_kimi-k2-instruct-0905';
import accounts_fireworks_models_kimi_k2_thinking from './models/accounts_fireworks_models_kimi-k2-thinking';
import accounts_fireworks_models_qwen2p5_72b_instruct from './models/accounts_fireworks_models_qwen2p5-72b-instruct';
import accounts_fireworks_models_qwen2p5_32b_instruct from './models/accounts_fireworks_models_qwen2p5-32b-instruct';
import accounts_fireworks_models_qwen2p5_coder_32b_instruct from './models/accounts_fireworks_models_qwen2p5-coder-32b-instruct';
import accounts_fireworks_models_qwen2p5_vl_32b_instruct from './models/accounts_fireworks_models_qwen2p5-vl-32b-instruct';
import accounts_fireworks_models_qwen2p5_vl_72b_instruct from './models/accounts_fireworks_models_qwen2p5-vl-72b-instruct';
import fireworks_qwen3_embedding_8b from './models/fireworks_qwen3-embedding-8b';
import fireworks_qwen3_embedding_4b from './models/fireworks_qwen3-embedding-4b';
import fireworks_qwen3_reranker_8b from './models/fireworks_qwen3-reranker-8b';
import fireworks_qwen3_reranker_4b from './models/fireworks_qwen3-reranker-4b';
import accounts_fireworks_models_flux_1_dev_fp8 from './models/accounts_fireworks_models_flux-1-dev-fp8';
import nomic_ai_nomic_embed_text_v1_5 from './models/nomic-ai_nomic-embed-text-v1.5';

/** All Fireworks AI models */
export const models: Record<string, ModelDefinition> = {
  // Llama family
  'accounts/fireworks/models/llama-v3p3-70b-instruct': accounts_fireworks_models_llama_v3p3_70b_instruct,
  'accounts/fireworks/models/llama-v3p1-405b-instruct': accounts_fireworks_models_llama_v3p1_405b_instruct,
  'accounts/fireworks/models/llama-v3p1-70b-instruct': accounts_fireworks_models_llama_v3p1_70b_instruct,
  'accounts/fireworks/models/llama-v3p1-8b-instruct': accounts_fireworks_models_llama_v3p1_8b_instruct,

  // DeepSeek family
  'accounts/fireworks/models/deepseek-r1': accounts_fireworks_models_deepseek_r1,
  'accounts/fireworks/models/deepseek-v3': accounts_fireworks_models_deepseek_v3,
  'accounts/fireworks/models/deepseek-v3p1': accounts_fireworks_models_deepseek_v3p1,

  // FireFunction
  'accounts/fireworks/models/firefunction-v1': accounts_fireworks_models_firefunction_v1,

  // Kimi K2
  'accounts/fireworks/models/kimi-k2-instruct-0905': accounts_fireworks_models_kimi_k2_instruct_0905,
  'accounts/fireworks/models/kimi-k2-thinking': accounts_fireworks_models_kimi_k2_thinking,

  // Qwen2.5 text & code
  'accounts/fireworks/models/qwen2p5-72b-instruct': accounts_fireworks_models_qwen2p5_72b_instruct,
  'accounts/fireworks/models/qwen2p5-32b-instruct': accounts_fireworks_models_qwen2p5_32b_instruct,
  'accounts/fireworks/models/qwen2p5-coder-32b-instruct': accounts_fireworks_models_qwen2p5_coder_32b_instruct,

  // Qwen2.5 vision
  'accounts/fireworks/models/qwen2p5-vl-32b-instruct': accounts_fireworks_models_qwen2p5_vl_32b_instruct,
  'accounts/fireworks/models/qwen2p5-vl-72b-instruct': accounts_fireworks_models_qwen2p5_vl_72b_instruct,

  // Embeddings
  'nomic-ai/nomic-embed-text-v1.5': nomic_ai_nomic_embed_text_v1_5,
  'fireworks/qwen3-embedding-8b': fireworks_qwen3_embedding_8b,
  'fireworks/qwen3-embedding-4b': fireworks_qwen3_embedding_4b,

  // Rerankers
  'fireworks/qwen3-reranker-8b': fireworks_qwen3_reranker_8b,
  'fireworks/qwen3-reranker-4b': fireworks_qwen3_reranker_4b,

  // Image generation
  'accounts/fireworks/models/flux-1-dev-fp8': accounts_fireworks_models_flux_1_dev_fp8,
};

/** Fireworks AI provider definition */
export const provider: ProviderDefinition = defineProvider({
  ...{
    id: 'fireworks',
    name: 'Fireworks AI',
    category: 'official',
    apiFormat: 'openai-completions',
    baseUrl: 'https://api.fireworks.ai/inference/v1',
    docsUrl: 'https://docs.fireworks.ai/',
    pricingUrl: 'https://fireworks.ai/pricing',
    statusUrl: 'https://status.fireworks.ai/',
    auth: {
      type: 'api_key',
      header: 'Authorization',
      prefix: 'Bearer ',
      envVar: 'FIREWORKS_API_KEY',
    },
  },
  models,
});

export default provider;

// Re-export individual models
export {
  accounts_fireworks_models_llama_v3p3_70b_instruct,
  accounts_fireworks_models_llama_v3p1_405b_instruct,
  accounts_fireworks_models_llama_v3p1_70b_instruct,
  accounts_fireworks_models_llama_v3p1_8b_instruct,
  accounts_fireworks_models_deepseek_r1,
  accounts_fireworks_models_deepseek_v3,
  accounts_fireworks_models_deepseek_v3p1,
  accounts_fireworks_models_firefunction_v1,
  accounts_fireworks_models_kimi_k2_instruct_0905,
  accounts_fireworks_models_kimi_k2_thinking,
  accounts_fireworks_models_qwen2p5_72b_instruct,
  accounts_fireworks_models_qwen2p5_32b_instruct,
  accounts_fireworks_models_qwen2p5_coder_32b_instruct,
  accounts_fireworks_models_qwen2p5_vl_32b_instruct,
  accounts_fireworks_models_qwen2p5_vl_72b_instruct,
  fireworks_qwen3_embedding_8b,
  fireworks_qwen3_embedding_4b,
  fireworks_qwen3_reranker_8b,
  fireworks_qwen3_reranker_4b,
  accounts_fireworks_models_flux_1_dev_fp8,
  nomic_ai_nomic_embed_text_v1_5,
};

// Re-export defaults for external use
export * from './_defaults';
