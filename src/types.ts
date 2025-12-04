import type { LanguageModel } from 'ai';

// EmbeddingModel is no longer generic in AI SDK v6
type EmbeddingModelType = ReturnType<any['textEmbeddingModel']>;

// =============================================================================
// Provider Types
// =============================================================================

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

export type GatewayType = 'official' | 'openrouter' | 'vertex' | 'bedrock';

export type ModelType = 'language' | 'embedding' | 'reranker';

// =============================================================================
// Reasoning Configuration Types
// =============================================================================

export type ReasoningStyle = 'effort' | 'budget' | 'level' | 'toggle' | 'none';

export type EffortLevel = 'low' | 'medium' | 'high' | 'minimal' | 'none';

export type ThinkingLevel = 'low' | 'high';

export interface ReasoningConfigEffort {
  style: 'effort';
  values: EffortLevel[];
  default: EffortLevel;
}

export interface ReasoningConfigBudget {
  style: 'budget';
  min: number;
  max: number;
  default: number; // -1 for dynamic
  can_disable?: boolean;
}

export interface ReasoningConfigLevel {
  style: 'level';
  values: ThinkingLevel[];
  default: ThinkingLevel;
  can_disable?: boolean;
}

export interface ReasoningConfigToggle {
  style: 'toggle';
  default: boolean;
}

export interface ReasoningConfigNone {
  style: 'none';
}

export type ReasoningConfig =
  | ReasoningConfigEffort
  | ReasoningConfigBudget
  | ReasoningConfigLevel
  | ReasoningConfigToggle
  | ReasoningConfigNone;

// =============================================================================
// Caching Configuration Types
// =============================================================================

export type CachingStyle = 'auto' | 'manual' | 'none';

export interface CachingConfig {
  style: CachingStyle;
  discount?: number; // e.g., 0.90 for 90% off cached reads
  min_tokens?: number; // Minimum tokens for caching (Anthropic)
  ttl_minutes?: number;
}

// =============================================================================
// Pricing Types
// =============================================================================

export interface PricingConfig {
  input: number; // per 1M tokens
  output?: number; // per 1M tokens (for language models)
  cached?: number; // per 1M cached tokens
  reasoning?: number; // per 1M reasoning tokens (if different from output)
  per_search?: number; // For rerankers with per-search pricing
}

// =============================================================================
// Model Parameters
// =============================================================================

export interface ModelParameters {
  temperature?: number;
  top_p?: number;
  top_k?: number;
  max_tokens?: number;
  dimensions?: number; // For embeddings
  input_type?: 'document' | 'query'; // For Voyage embeddings
}

// =============================================================================
// OpenRouter Routing Configuration
// =============================================================================

export interface OpenRouterRouting {
  only?: string[];
  order?: string[];
}

// =============================================================================
// Model Configuration (from models.yaml)
// =============================================================================

export interface ModelConfig {
  provider: ProviderType;
  model_id: string;
  type: ModelType;
  reasoning?: ReasoningConfig;
  caching?: CachingConfig;
  parameters?: ModelParameters;
  routing?: OpenRouterRouting; // OpenRouter provider routing
  context_window?: number;
  pricing: PricingConfig;
}

// =============================================================================
// Provider Configuration (from models.yaml)
// =============================================================================

export interface ProviderConfig {
  env_key: string;
  base_url?: string;
  sdk?: 'ai-sdk' | 'native'; // Whether to use AI SDK or native SDK
  headers?: Record<string, string>;
}

// =============================================================================
// Models Configuration File Schema
// =============================================================================

export interface ModelsConfigFile {
  version: string;
  providers?: Record<string, ProviderConfig>;
  models: Record<string, ModelConfig>;
}

// =============================================================================
// Role Configuration Types
// =============================================================================

export interface ReasoningOverride {
  effort?: EffortLevel;
  budget?: number;
  level?: ThinkingLevel;
  enabled?: boolean;
}

export interface RoleOverrides {
  reasoning?: ReasoningOverride;
  parameters?: Partial<ModelParameters>;
}

export interface SimpleRoleConfig {
  model: string;
  overrides?: RoleOverrides;
}

export interface RoleWithFallback {
  primary: string;
  fallback: string;
  overrides?: RoleOverrides;
}

export interface RoleWithVariants {
  [variant: string]: SimpleRoleConfig;
}

export type RoleConfig = SimpleRoleConfig | RoleWithFallback | RoleWithVariants;

// =============================================================================
// Roles Configuration File Schema
// =============================================================================

export interface RolesConfigFile {
  version: string;
  roles: Record<string, RoleConfig>;
  environments?: Record<string, Record<string, Partial<SimpleRoleConfig>>>;
}

// =============================================================================
// Service Configuration
// =============================================================================

export interface SilkboardConfig {
  modelsConfig: string | ModelsConfigFile;
  rolesConfig?: string | RolesConfigFile;
  pricingCache?: string;
  cacheStore?: CacheStore;
  environment?: string;
}

// =============================================================================
// Cache Store Interface
// =============================================================================

export interface CacheStore {
  get(key: string): Promise<string | null>;
  set(key: string, value: string, ttlSeconds?: number): Promise<void>;
  delete(key: string): Promise<void>;
}

// =============================================================================
// Usage & Cost Tracking Types
// =============================================================================

export interface UsageRecord {
  model: string;
  role?: string;
  variant?: string;
  inputTokens: number;
  outputTokens: number;
  cachedTokens?: number;
  reasoningTokens?: number;
  latencyMs: number;
  cost: number;
  timestamp: Date;
}

export interface UsageSummary {
  totalCost: number;
  totalInputTokens: number;
  totalOutputTokens: number;
  totalCachedTokens: number;
  totalReasoningTokens: number;
  byModel: Record<string, { cost: number; requests: number }>;
  byRole: Record<string, { cost: number; requests: number }>;
}

// =============================================================================
// Service Method Options
// =============================================================================

export interface BaseRequestOptions {
  model?: string;
  role?: string;
  variant?: string;
  reasoning?: ReasoningOverride;
  parameters?: Partial<ModelParameters>;
  abortSignal?: AbortSignal;
}

export interface TextOptions extends BaseRequestOptions {
  messages: Array<{
    role: 'system' | 'user' | 'assistant';
    content: string;
  }>;
  system?: string;
  tools?: Record<string, unknown>;
}

export interface EmbedOptions extends BaseRequestOptions {
  value: string | string[];
}

export interface RerankOptions extends BaseRequestOptions {
  query: string;
  documents: string[];
  topN?: number;
}

// =============================================================================
// Reranking Result Types
// =============================================================================

export interface RerankResult {
  index: number;
  relevanceScore: number;
  document: string;
}

// =============================================================================
// Resolved Model (internal)
// =============================================================================

export interface ResolvedModel {
  alias: string;
  config: ModelConfig;
  instance: LanguageModel;
  providerOptions: Record<string, unknown>;
  extraBody?: Record<string, unknown>; // For OpenRouter
}

export interface ResolvedEmbeddingModel {
  alias: string;
  config: ModelConfig;
  instance: EmbeddingModelType;
}

// =============================================================================
// Event Types
// =============================================================================

export interface UsageEvent extends Omit<UsageRecord, 'timestamp'> {
  timestamp: Date;
}

export type SilkboardEvent = {
  usage: UsageEvent;
  error: { model: string; error: Error };
};

export type SilkboardEventHandler<K extends keyof SilkboardEvent> = (
  event: SilkboardEvent[K]
) => void;
