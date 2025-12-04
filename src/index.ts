// Main service
export { LLMService, createLLMService } from './service';

// Configuration
export { ConfigLoader, createConfigLoader } from './config/loader';

// Provider registry
export { ModelRegistry, createModelRegistry } from './providers/registry';
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
  LLMServiceConfig,
  CacheStore,
  
  // Usage & cost tracking
  UsageRecord,
  UsageSummary,
  
  // Request options
  BaseRequestOptions,
  TextRequestOptions,
  EmbedRequestOptions,
  RerankRequestOptions,
  
  // Results
  RerankResult,
  ResolvedModel,
  ResolvedEmbeddingModel,
  
  // Events
  UsageEvent,
  LLMServiceEvent,
  LLMServiceEventHandler,
} from './types';
