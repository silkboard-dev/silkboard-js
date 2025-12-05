/**
 * Registry Type Definitions
 * 
 * All types for the model registry are defined here.
 * These provide compile-time type safety for model and provider definitions.
 */

// =============================================================================
// Pricing Types
// =============================================================================

export type BillingUnit = 'token' | 'character' | 'request' | 'second' | 'image';
export type Currency = 'USD' | 'EUR' | 'GBP';

export interface TokenPricing {
  input: number;
  output?: number;
  cachedInput?: number;
  cachedOutput?: number;
  reasoning?: number;
}

export interface ContextTier {
  upTo: number | 'unlimited';
  pricing: TokenPricing;
}

export interface BatchPricing {
  input: number;
  output?: number;
  discountPercent?: number;
}

export interface PromptCachingPricing {
  write: number;
  read: number;
  ttlSeconds?: number;
}

export interface ModalityPricing {
  text?: TokenPricing;
  audio?: TokenPricing;
  image?: TokenPricing;
  video?: TokenPricing;
}

export interface UnitPricing {
  perRequest?: number;
  perImage?: number;
  perSecond?: number;
  perSearch?: number;
}

export interface ModelPricing {
  standard: TokenPricing;
  contextTiers?: ContextTier[];
  batch?: BatchPricing;
  priority?: TokenPricing;
  flex?: TokenPricing;
  promptCaching?: PromptCachingPricing;
  modality?: ModalityPricing;
  unit?: UnitPricing;
  notes?: string;
}

export type PricingTier = 'standard' | 'batch' | 'priority' | 'flex';

// =============================================================================
// Capability Types
// =============================================================================

export type ModelType =
  | 'chat'
  | 'completion'
  | 'embedding'
  | 'rerank'
  | 'image-generation'
  | 'image'
  | 'audio-speech'
  | 'audio-transcription'
  | 'audio'
  | 'video-generation'
  | 'video'
  | 'multimodal'
  | 'reasoning'
  | 'moderation'
  | 'search'
  | 'robotics'
  | 'music'
  | 'music-generation'
  | 'live'
  | 'tts';

export type ModelStatus = 'ga' | 'preview' | 'beta' | 'deprecated' | 'legacy' | 'experimental';

export interface ContextWindow {
  input: number;
  output?: number;
  total?: number;
}

export interface InputModalities {
  text?: boolean;
  image?: boolean;
  audio?: boolean;
  video?: boolean;
  file?: boolean;
}

export interface OutputModalities {
  text?: boolean;
  image?: boolean;
  audio?: boolean;
  video?: boolean;
  embedding?: boolean;
}

export interface Modalities {
  input: InputModalities;
  output: OutputModalities;
}

export interface ModelCapabilities {
  streaming?: boolean;
  functionCalling?: boolean;
  parallelToolCalls?: boolean;
  structuredOutput?: boolean;
  jsonMode?: boolean;
  systemPrompt?: boolean;
  logprobs?: boolean;
  seed?: boolean;
  stopSequences?: boolean;
  embeddings?: boolean;
  dimensions?: number[];
  imageGeneration?: boolean;
  videoGeneration?: boolean;
  musicGeneration?: boolean;
  [key: string]: boolean | number[] | undefined;
}

export interface ModelFeatures {
  webSearch?: boolean;
  fileSearch?: boolean;
  codeInterpreter?: boolean;
  imageGeneration?: boolean;
  computerUse?: boolean;
  mcp?: boolean;
  fineTuning?: boolean;
  distillation?: boolean;
  predictedOutputs?: boolean;
  promptCaching?: boolean;
  batchApi?: boolean;
  realtimeApi?: boolean;
  assistantsApi?: boolean;
  imageInput?: boolean;
  proSearch?: boolean;
  deepResearch?: boolean;
  domainFiltering?: boolean;
  grounding?: boolean;
  codeExecution?: boolean;
  contextCaching?: boolean;
  tuning?: boolean;
  liveApi?: boolean;
  nativeToolUse?: boolean;
  spatialUnderstanding?: boolean;
  [key: string]: boolean | undefined;
}

export type ReasoningType =
  | 'native'
  | 'extended_thinking'
  | 'reasoning_effort'
  | 'thinking_budget'
  | 'thinking'
  | 'experimental';

export interface ReasoningConfig {
  supported: boolean;
  type?: ReasoningType;
  defaultEnabled?: boolean;
  budgetTokens?: {
    min?: number;
    max?: number;
    default?: number;
  };
  effortLevels?: ('low' | 'medium' | 'high')[];
}

export type CachingType = 'automatic' | 'explicit' | 'ephemeral';

export interface CachingConfig {
  supported: boolean;
  type?: CachingType;
  minTokens?: number;
  ttlSeconds?: number;
  discountPercent?: number;
}

export interface ModelArchitecture {
  parameters?: string;
  architecture?: string;
  trainingCutoff?: string;
}

export interface RateLimits {
  rpm?: number;
  rpd?: number;
  rps?: number;
  tpm?: number;
  tpd?: number;
  ipm?: number;
  concurrent?: number;
  batchQueueLimit?: number;
  [key: string]: number | RateLimits | undefined;
}

// =============================================================================
// Model Definition
// =============================================================================

export interface ModelDefinition {
  id: string;
  name: string;
  description?: string;
  type: ModelType;
  family: string;
  aliases?: string[];
  status: ModelStatus;
  releaseDate?: string;
  deprecationDate?: string;
  architecture?: ModelArchitecture;
  contextWindow: ContextWindow;
  modalities: Modalities;
  pricing: ModelPricing;
  capabilities: ModelCapabilities;
  features: ModelFeatures;
  reasoning?: ReasoningConfig;
  caching?: CachingConfig;
  rateLimits?: RateLimits;
}

// =============================================================================
// Provider Definition
// =============================================================================

export type ProviderCategory = 'official' | 'third-party' | 'cloud' | 'gateway';

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

export type AuthType = 'api_key' | 'bearer' | 'oauth' | 'iam' | 'service_account';

export interface AuthConfig {
  type: AuthType;
  header?: string;
  prefix?: string;
  envVar?: string;
}

export interface UsageTier {
  name: string;
  qualification?: string;
  usageLimitUsd?: number;
  limits: RateLimits;
}

export interface ProviderDefaults {
  billingUnit?: BillingUnit;
  currency?: Currency;
  rateUnit?: number;
  apiFormat?: ApiFormat;
}

export interface ProviderDefinition {
  id: string;
  name: string;
  category: ProviderCategory;
  apiFormat: ApiFormat;
  baseUrl: string;
  docsUrl?: string;
  pricingUrl?: string;
  statusUrl?: string;
  auth?: AuthConfig;
  supportedRegions?: string[];
  defaults?: ProviderDefaults;
  usageTiers?: Record<string, UsageTier>;
  models: Record<string, ModelDefinition>;
}
