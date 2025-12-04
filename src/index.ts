// Main service
export { Silkboard, createSilkboard } from './service';

// Configuration
export { ConfigLoader, createConfigLoader } from './loaders';

// Provider registry
export { Registry, createRegistry } from './providers/registry';
export { getProvider, isProviderAvailable, clearProviderCache } from './providers/factory';

// Adapters
export {
  voyageEmbed,
  voyageRerank,
  isVoyageAvailable,
  cohereRerank,
  isCohereAvailable,
} from './providers/adapters';

// Reasoning builders
export {
  buildReasoningConfig,
  buildOpenAIProviderOptions,
  buildAnthropicProviderOptions,
  buildGoogleProviderOptions,
  buildOpenRouterExtraBody,
} from './reasoning';

// Caching
export {
  createCacheMiddleware,
  MemoryCacheStore,
  addAnthropicCacheControl,
  createCachedSystemMessage,
  type CacheMiddlewareOptions,
} from './caching';

// Cost tracking
export { CostTracker, createCostTracker } from './cost/tracker';

// Error handling
export { SilkboardError, SilkboardErrorCode } from './errors';

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
  UsageEvent,
  SilkboardEvent,
  SilkboardEventHandler,
} from './types';
