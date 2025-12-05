/**
 * Configuration types for models, roles, and service setup.
 */

import type { ProviderType, ProviderConfig, OpenRouterRouting, ModelType } from './providers';
import type { ReasoningConfig, ReasoningOverride } from './reasoning';

// =============================================================================
// Caching Configuration
// =============================================================================

/** Caching implementation style */
export type CachingStyle = 'auto' | 'manual' | 'none';

/** Caching configuration for a model */
export interface CachingConfig {
  style: CachingStyle;
  discount?: number; // e.g., 0.90 for 90% off cached reads
  min_tokens?: number; // Minimum tokens for caching (Anthropic)
  ttl_minutes?: number;
}

// =============================================================================
// Pricing Configuration
// =============================================================================

/** Pricing tier for context-based pricing (e.g., different prices above 200K tokens) */
export interface PricingTierConfig {
  up_to: number | 'unlimited';
  input: number;
  output?: number;
  cached?: number;
}

/** Pricing per 1M tokens */
export interface PricingConfig {
  input: number;
  output?: number;
  cached?: number;
  reasoning?: number;
  per_search?: number; // For rerankers with per-search pricing
  
  /** Context-based tiered pricing (e.g., Sonnet 4.5: different prices above 200K) */
  tiered?: PricingTierConfig[];
}

// =============================================================================
// Model Parameters
// =============================================================================

/** Model generation parameters */
export interface ModelParameters {
  temperature?: number;
  top_p?: number;
  top_k?: number;
  max_tokens?: number;
  dimensions?: number; // For embeddings
  input_type?: 'document' | 'query'; // For Voyage embeddings
}

// =============================================================================
// Model Configuration
// =============================================================================

/** Model configuration from models.yaml */
export interface ModelConfig {
  provider: ProviderType;
  model_id: string;
  type: ModelType;
  reasoning?: ReasoningConfig;
  caching?: CachingConfig;
  parameters?: ModelParameters;
  routing?: OpenRouterRouting;
  context_window?: number;
  pricing: PricingConfig;
}

/** Models configuration file schema */
export interface ModelsConfigFile {
  version: string;
  providers?: Record<string, ProviderConfig>;
  models: Record<string, ModelConfig>;
}

// =============================================================================
// Role Configuration
// =============================================================================

/** Role-specific parameter overrides */
export interface RoleOverrides {
  reasoning?: ReasoningOverride;
  parameters?: Partial<ModelParameters>;
}

/** Simple role pointing to a model */
export interface SimpleRoleConfig {
  model: string;
  overrides?: RoleOverrides;
}

/** Role with fallback model */
export interface RoleWithFallback {
  primary: string;
  fallback: string;
  overrides?: RoleOverrides;
}

/** Role with multiple variants */
export interface RoleWithVariants {
  [variant: string]: SimpleRoleConfig;
}

/** Union of all role config types */
export type RoleConfig = SimpleRoleConfig | RoleWithFallback | RoleWithVariants;

/** Roles configuration file schema */
export interface RolesConfigFile {
  version: string;
  roles: Record<string, RoleConfig>;
  environments?: Record<string, Record<string, Partial<SimpleRoleConfig>>>;
}

// =============================================================================
// Service Configuration
// =============================================================================

/** Cache store interface for pluggable caching */
export interface CacheStore {
  get(key: string): Promise<string | null>;
  set(key: string, value: string, ttlSeconds?: number): Promise<void>;
  delete(key: string): Promise<void>;
}

/** Main Silkboard service configuration */
export interface SilkboardConfig {
  modelsConfig: string | ModelsConfigFile;
  rolesConfig?: string | RolesConfigFile;
  routingConfig?: string | import('./router').RoutingConfig;
  pricingCache?: string;
  cacheStore?: CacheStore;
  environment?: string;
  /** Path to provider registry directory for pricing lookups */
  registryPath?: string;
  /** Enable stream events (emits 'stream' event for each chunk) */
  emitStreamEvents?: boolean;
}
