/**
 * Types for the provider metadata registry.
 * These types mirror the JSON schema in config/provider-metadata.schema.json
 */

// =============================================================================
// Provider Configuration
// =============================================================================

/** Provider category */
export type ProviderCategory = 'official' | 'third-party' | 'cloud' | 'gateway';

/** API endpoint format */
export type ApiFormat =
  | 'openai-completions'
  | 'openai-responses'
  | 'anthropic-messages'
  | 'google-gemini'
  | 'cohere'
  | 'bedrock'
  | 'vertex'
  | 'azure'
  | 'custom';

/** Authentication type */
export type AuthType = 'api_key' | 'bearer' | 'oauth' | 'iam' | 'service_account';

/** Authentication configuration */
export interface AuthConfig {
  type: AuthType;
  header?: string;
  prefix?: string;
  env_var?: string;
}

/** Provider metadata */
export interface ProviderMetadata {
  id: string;
  name: string;
  category: ProviderCategory;
  api_format?: ApiFormat;
  base_url?: string;
  docs_url?: string;
  pricing_url?: string;
  status_url?: string;
  auth?: AuthConfig;
  supported_regions?: string[];
}

// =============================================================================
// Model Configuration
// =============================================================================

/** Model type */
export type RegistryModelType =
  | 'chat'
  | 'completion'
  | 'embedding'
  | 'rerank'
  | 'image-generation'
  | 'audio-speech'
  | 'audio-transcription'
  | 'video-generation'
  | 'multimodal'
  | 'reasoning'
  | 'moderation';

/** Model status */
export type ModelStatus = 'ga' | 'preview' | 'beta' | 'deprecated' | 'legacy' | 'experimental';

/** Billing unit */
export type BillingUnit = 'token' | 'character' | 'request' | 'second' | 'image';

/** Context window configuration */
export interface ContextWindow {
  input?: number;
  output?: number;
  total?: number;
}

/** Input/output modalities */
export interface Modalities {
  input?: {
    text?: boolean;
    image?: boolean;
    audio?: boolean;
    video?: boolean;
    file?: boolean;
  };
  output?: {
    text?: boolean;
    image?: boolean;
    audio?: boolean;
    video?: boolean;
    embedding?: boolean;
  };
}

/** Pricing configuration */
export interface RegistryPricing {
  // Standard token pricing (per million tokens)
  input?: number;
  output?: number;
  cached_input?: number;
  cached_output?: number;
  reasoning?: number;
  
  // Per-unit pricing
  per_request?: number;
  per_image?: number;
  per_second?: number;
  per_search?: number;
  
  // Context-based tiered pricing (e.g., Sonnet 4.5: different prices above 200K)
  tiered?: PricingTier[];
  
  // Modality-specific pricing (e.g., OpenAI realtime: text vs audio vs image)
  modality_pricing?: ModalityPricing;
  
  // Batch API pricing
  batch?: BatchPricing;
  
  // Fine-tuning pricing
  fine_tuning?: FineTuningPricing;
  
  // Prompt caching pricing (Anthropic style: write vs read)
  prompt_caching?: PromptCachingPricing;
  
  // Priority tier pricing (higher cost for guaranteed availability)
  priority?: PriorityPricing;
  
  // Billing unit override (e.g., 'characters' for Gemini)
  unit?: string;
  
  // Additional notes
  notes?: string;
}

/** Context-based pricing tier (e.g., different prices above 200K tokens) */
export interface PricingTier {
  /** Token threshold - prices apply up to this limit */
  up_to: number | 'unlimited';
  /** Input price per million tokens for this tier */
  input?: number;
  /** Output price per million tokens for this tier */
  output?: number;
  /** Cached input price for this tier */
  cached_input?: number;
  /** Cached output price for this tier */
  cached_output?: number;
}

/** Batch API pricing */
export interface BatchPricing {
  input?: number;
  output?: number;
  discount_percent?: number;
}

/** Modality-specific pricing (for multimodal models) */
export interface ModalityPricing {
  text?: {
    input?: number;
    output?: number;
    cached_input?: number;
  };
  audio?: {
    input?: number;
    output?: number;
    cached_input?: number;
  };
  image?: {
    input?: number;
    output?: number;
    cached_input?: number;
  };
  video?: {
    input?: number;
    output?: number;
  };
}

/** Fine-tuning pricing */
export interface FineTuningPricing {
  training?: number;  // Per million tokens
  input?: number;     // Inference input after fine-tuning
  output?: number;    // Inference output after fine-tuning
  cached_input?: number;
  per_hour?: number;  // For time-based billing (e.g., reinforcement fine-tuning)
}

/** Prompt caching pricing (Anthropic style) */
export interface PromptCachingPricing {
  write?: number;     // Cost to write to cache
  read?: number;      // Cost to read from cache (discount)
  ttl_seconds?: number;
}

/** Priority tier pricing */
export interface PriorityPricing {
  input?: number;
  output?: number;
  multiplier?: number;  // e.g., 1.5x standard pricing
}

/** Model capabilities */
export interface ModelCapabilities {
  streaming?: boolean;
  function_calling?: boolean;
  parallel_tool_calls?: boolean;
  structured_output?: boolean;
  json_mode?: boolean;
  system_prompt?: boolean;
  logprobs?: boolean;
  seed?: boolean;
  stop_sequences?: boolean;
  embeddings?: boolean;
  dimensions?: number[];
}

/** Advanced features */
export interface ModelFeatures {
  web_search?: boolean;
  file_search?: boolean;
  code_interpreter?: boolean;
  image_generation?: boolean;
  computer_use?: boolean;
  mcp?: boolean;
  fine_tuning?: boolean;
  distillation?: boolean;
  predicted_outputs?: boolean;
  prompt_caching?: boolean;
  batch_api?: boolean;
  realtime_api?: boolean;
  assistants_api?: boolean;
}

/** Reasoning configuration */
export interface RegistryReasoningConfig {
  supported?: boolean;
  type?: 'native' | 'extended_thinking' | 'reasoning_effort' | 'thinking_budget';
  default_enabled?: boolean;
  budget_tokens?: {
    min?: number;
    max?: number;
    default?: number;
  };
  effort_levels?: string[];
}

/** Caching configuration */
export interface RegistryCachingConfig {
  supported?: boolean;
  type?: 'automatic' | 'explicit' | 'ephemeral';
  min_tokens?: number;
  ttl_seconds?: number;
  discount_percent?: number;
}

/** Rate limits */
export interface RateLimits {
  rpm?: number;
  rpd?: number;
  tpm?: number;
  tpd?: number;
  ipm?: number;
  concurrent?: number;
  batch_queue_limit?: number;
}

/** Rate limit tier */
export interface RateLimitTier {
  name?: string;
  qualification?: string;
  usage_limit_usd?: number;
  limits?: RateLimits;
}

/** Quantization options */
export interface Quantization {
  available?: string[];
  default?: string;
  notes?: string;
}

/** Model architecture */
export interface ModelArchitecture {
  parameters?: string;
  architecture?: string;
  training_cutoff?: string;
}

/** Full model metadata */
export interface ModelMetadata {
  name: string;
  description?: string;
  type: RegistryModelType;
  family?: string;
  aliases?: string[];
  status?: ModelStatus;
  release_date?: string;
  deprecation_date?: string;
  architecture?: ModelArchitecture;
  context_window?: ContextWindow;
  modalities?: Modalities;
  pricing?: RegistryPricing;
  capabilities?: ModelCapabilities;
  features?: ModelFeatures;
  reasoning?: RegistryReasoningConfig;
  caching?: RegistryCachingConfig;
  rate_limits?: RateLimits;
  quantization?: Quantization;
}

// =============================================================================
// Provider File Schema
// =============================================================================

/** Default values for provider */
export interface ProviderDefaults {
  billing_unit?: BillingUnit;
  currency?: string;
  rate_unit?: number;
  api_format?: ApiFormat;
}

/** Complete provider metadata file */
export interface ProviderMetadataFile {
  provider: ProviderMetadata;
  version: string;
  last_updated?: string;
  defaults?: ProviderDefaults;
  rate_limit_tiers?: Record<string, RateLimitTier>;
  models: Record<string, ModelMetadata>;
}

// =============================================================================
// Registry Types
// =============================================================================

/** Resolved model with provider context */
export interface ResolvedModel {
  providerId: string;
  providerName: string;
  providerCategory: ProviderCategory;
  modelId: string;
  metadata: ModelMetadata;
  defaults: ProviderDefaults;
}

/** Registry lookup result */
export interface RegistryLookupResult {
  provider: ProviderMetadata;
  model: ModelMetadata;
  defaults: ProviderDefaults;
}
