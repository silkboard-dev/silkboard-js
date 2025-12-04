/**
 * Provider and model type definitions.
 */

/** Supported LLM providers */
export type ProviderType =
  | 'openai'
  | 'anthropic'
  | 'google'
  | 'groq'
  | 'cerebras'
  | 'xai'
  | 'cohere'
  | 'openrouter'
  | 'voyage';

/** Gateway types for routing */
export type GatewayType = 'official' | 'openrouter' | 'vertex' | 'bedrock';

/** Model capability types */
export type ModelType = 'language' | 'embedding' | 'reranker';

/** Provider configuration from models.yaml */
export interface ProviderConfig {
  env_key: string;
  base_url?: string;
  sdk?: 'ai-sdk' | 'native';
  headers?: Record<string, string>;
}

/** OpenRouter-specific routing configuration */
export interface OpenRouterRouting {
  only?: string[];
  order?: string[];
}
