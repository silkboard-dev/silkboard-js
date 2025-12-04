/**
 * @fileoverview Silkboard SDK - Unified LLM router built on Vercel AI SDK.
 * 
 * Silkboard provides a unified interface to access 50+ models across 9+ providers
 * with reasoning normalization, cost tracking, and YAML-based configuration.
 * 
 * @example
 * ```typescript
 * import { Silkboard } from 'silkboard';
 * 
 * const silk = new Silkboard({
 *   modelsConfig: './config/models.yaml',
 *   rolesConfig: './config/roles.yaml',
 * });
 * 
 * const result = await silk.streamText({
 *   role: 'answer',
 *   variant: 'balanced',
 *   messages: [{ role: 'user', content: 'Hello' }],
 * });
 * ```
 * @packageDocumentation
 */

/**
 * Main Silkboard service class and factory function.
 * @see {@link Silkboard} for the main service class
 * @see {@link createSilkboard} for factory function
 */
export { Silkboard, createSilkboard } from './service';

/**
 * Configuration loading utilities for YAML-based model and role configs.
 * @see {@link ConfigLoader} for loading and validating configurations
 */
export { ConfigLoader, createConfigLoader } from './loaders';

/**
 * Provider registry for model instance management and caching.
 * @see {@link Registry} for model resolution and caching
 */
export { Registry, createRegistry } from './providers/registry';

/**
 * Provider factory functions for lazy initialization.
 */
export { getProvider, isProviderAvailable, clearProviderCache } from './providers/factory';

/**
 * Native SDK adapters for providers not fully supported by AI SDK.
 * Voyage AI and Cohere have native adapters for embedding and reranking.
 */
export {
  voyageEmbed,
  voyageRerank,
  isVoyageAvailable,
  cohereRerank,
  isCohereAvailable,
} from './providers/adapters';

/**
 * Reasoning configuration builders for provider-specific thinking/reasoning APIs.
 * These normalize the different reasoning implementations across providers.
 * 
 * @example
 * ```typescript
 * // Build Anthropic thinking config
 * const config = buildAnthropicProviderOptions(modelConfig, { budget: 10000 });
 * ```
 */
export {
  buildReasoningConfig,
  buildOpenAIProviderOptions,
  buildAnthropicProviderOptions,
  buildGoogleProviderOptions,
  buildOpenRouterExtraBody,
} from './reasoning';

/**
 * Caching utilities including memory cache and Anthropic prompt caching.
 * @see {@link createCacheMiddleware} for AI SDK middleware
 * @see {@link MemoryCacheStore} for in-memory cache implementation
 */
export {
  createCacheMiddleware,
  MemoryCacheStore,
  addAnthropicCacheControl,
  createCachedSystemMessage,
  type CacheMiddlewareOptions,
} from './caching';

/**
 * Cost tracking for monitoring LLM usage and spending.
 * @see {@link CostTracker} for usage tracking and cost calculation
 */
export { CostTracker, createCostTracker } from './cost/tracker';

/**
 * Event system for observability and lifecycle hooks.
 * @see {@link SilkboardEventEmitter} for the event emitter class
 * @see {@link generateRequestId} for creating unique request IDs
 * 
 * @example
 * ```typescript
 * silk.on('start', ({ requestId, model }) => {
 *   console.log(`Request ${requestId} started with model ${model}`);
 * });
 * 
 * silk.on('complete', ({ latencyMs, usage }) => {
 *   metrics.timing('request.latency', latencyMs);
 * });
 * 
 * silk.on('error', ({ error, willRetry }) => {
 *   if (!willRetry) alerting.notify(error);
 * });
 * ```
 */
export {
  SilkboardEventEmitter,
  generateRequestId,
  createEventEmitter,
} from './events';

/**
 * Custom error classes with error codes for better error handling.
 * @see {@link SilkboardError} for the base error class
 * @see {@link SilkboardErrorCode} for available error codes
 */
export { SilkboardError, SilkboardErrorCode } from './errors';

/**
 * Telemetry interfaces for logging and metrics.
 * @see {@link SilkboardLogger} for pluggable logging
 * @see {@link SilkboardMetrics} for pluggable metrics
 */
export {
  type SilkboardLogger,
  consoleLogger,
  noopLogger,
  createPrefixedLogger,
  type SilkboardMetrics,
  noopMetrics,
  consoleMetrics,
  MetricNames,
} from './telemetry';

// Types
export type {
  // Provider types
  ProviderType,
  GatewayType,
  ModelType,
  
  // Reasoning types
  ReasoningStyle,
  EffortLevel,
  ThinkingLevel,
  ReasoningConfig,
  ReasoningConfigEffort,
  ReasoningConfigBudget,
  ReasoningConfigLevel,
  ReasoningConfigToggle,
  ReasoningConfigNone,
  ReasoningOverride,
  
  // Caching types
  CachingStyle,
  CachingConfig,
  
  // Pricing types
  PricingConfig,
  
  // Model configuration
  ModelParameters,
  OpenRouterRouting,
  ModelConfig,
  ProviderConfig,
  ModelsConfigFile,
  
  // Role configuration
  RoleOverrides,
  SimpleRoleConfig,
  RoleWithFallback,
  RoleWithVariants,
  RoleConfig,
  RolesConfigFile,
  
  // Service configuration
  SilkboardConfig,
  CacheStore,
  
  // Usage & cost tracking
  UsageRecord,
  UsageSummary,
  
  // Request options
  BaseRequestOptions,
  TextOptions,
  EmbedOptions,
  RerankOptions,
  
  // Results
  RerankResult,
  ResolvedModel,
  ResolvedEmbeddingModel,
  
  // Events
  TokenUsage,
  UsageEvent,
  StartEvent,
  CompleteEvent,
  ErrorEvent,
  RetryEvent,
  FallbackEvent,
  CacheHitEvent,
  CacheMissEvent,
  SilkboardEvent,
  SilkboardEventHandler,
} from './types';
