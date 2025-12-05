/**
 * Router configuration types for model selection and routing strategies.
 */

// =============================================================================
// Routing Modes
// =============================================================================

/** Available routing modes */
export type RoutingMode = 'none' | 'role-based' | 'strategy' | 'conditional';

/** Routing strategy types */
export type RoutingStrategy = 
  | 'simple-shuffle'    // Random selection
  | 'round-robin'       // Sequential rotation
  | 'lowest-latency'    // Route to fastest
  | 'lowest-cost'       // Route to cheapest
  | 'least-busy';       // Route to least loaded (requires external metrics)

// =============================================================================
// Deployment Configuration
// =============================================================================

/** A model deployment for routing */
export interface Deployment {
  /** Model alias from models.yaml */
  model: string;
  /** Weight for weighted random selection (default: 1) */
  weight?: number;
  /** Whether this deployment is enabled (default: true) */
  enabled?: boolean;
  /** Optional tags for filtering */
  tags?: string[];
}

/** Deployment health status */
export interface DeploymentHealth {
  model: string;
  healthy: boolean;
  lastError?: Error;
  lastErrorTime?: Date;
  consecutiveFailures: number;
  averageLatencyMs?: number;
  requestCount: number;
}

// =============================================================================
// Fallback Configuration
// =============================================================================

/** Fallback configuration */
export interface FallbackConfig {
  /** Model to fallback from */
  from: string;
  /** Ordered list of fallback models */
  to: string[];
}

/** Cooldown configuration for failed deployments */
export interface CooldownConfig {
  /** Number of failures before cooldown */
  failureThreshold: number;
  /** Cooldown duration in seconds */
  cooldownSeconds: number;
}

// =============================================================================
// Retry Configuration
// =============================================================================

/** Retry configuration */
export interface RetryConfig {
  /** Maximum retry attempts (default: 3) */
  maxRetries?: number;
  /** Initial delay in ms (default: 1000) */
  initialDelayMs?: number;
  /** Maximum delay in ms (default: 30000) */
  maxDelayMs?: number;
  /** Backoff multiplier (default: 2) */
  backoffMultiplier?: number;
  /** Errors that should trigger retry */
  retryableErrors?: string[];
}

// =============================================================================
// Conditional Routing
// =============================================================================

/** Condition for conditional routing */
export interface RoutingCondition {
  /** Condition to match (dot-notation path in metadata) */
  when: Record<string, unknown>;
  /** Model to route to when condition matches */
  then: {
    model: string;
  };
}

// =============================================================================
// Routing Configuration
// =============================================================================

/** Mode: none - pass-through, no routing logic */
export interface NoneRoutingConfig {
  mode: 'none';
}

/** Mode: role-based - existing role/variant resolution */
export interface RoleBasedRoutingConfig {
  mode: 'role-based';
  /** Default model when no role specified */
  defaultModel?: string;
}

/** Mode: strategy - algorithmic routing across deployments */
export interface StrategyRoutingConfig {
  mode: 'strategy';
  /** Routing strategy */
  strategy: RoutingStrategy;
  /** Available deployments */
  deployments: Deployment[];
  /** Fallback configuration */
  fallbacks?: FallbackConfig[];
  /** Cooldown configuration */
  cooldown?: CooldownConfig;
  /** Retry configuration */
  retry?: RetryConfig;
}

/** Mode: conditional - route based on request metadata */
export interface ConditionalRoutingConfig {
  mode: 'conditional';
  /** Routing conditions (evaluated in order) */
  conditions: RoutingCondition[];
  /** Default model when no condition matches */
  default: {
    model: string;
  };
  /** Fallback configuration */
  fallbacks?: FallbackConfig[];
  /** Retry configuration */
  retry?: RetryConfig;
}

/** Union of all routing configurations */
export type RoutingConfig =
  | NoneRoutingConfig
  | RoleBasedRoutingConfig
  | StrategyRoutingConfig
  | ConditionalRoutingConfig;

// =============================================================================
// Router Context
// =============================================================================

/** Context passed to router for decision making */
export interface RouterContext {
  /** Request ID for correlation */
  requestId: string;
  /** Model alias (if specified directly) */
  model?: string;
  /** Role name (if using role-based) */
  role?: string;
  /** Variant name (if using role-based with variants) */
  variant?: string;
  /** Request metadata for conditional routing */
  metadata?: Record<string, unknown>;
  /** Estimated input tokens (for cost-based routing) */
  estimatedInputTokens?: number;
  /** Estimated output tokens (for cost-based routing) */
  estimatedOutputTokens?: number;
}

/** Result of routing decision */
export interface RoutingResult {
  /** Selected model alias */
  model: string;
  /** Reason for selection */
  reason: 'direct' | 'role' | 'strategy' | 'condition' | 'fallback' | 'default';
  /** Original model (if fallback occurred) */
  originalModel?: string;
  /** Attempt number (1-based) */
  attempt: number;
}

// Note: Router events (RetryEvent, FallbackEvent, CooldownEvent) are defined in requests.ts
