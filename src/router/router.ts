/**
 * Router - handles model selection and routing based on configuration.
 */

import type {
  RoutingConfig,
  RouterContext,
  RoutingResult,
  DeploymentHealth,
  FallbackConfig,
  CooldownConfig,
  RetryConfig,
  StrategyRoutingConfig,
  ConditionalRoutingConfig,
} from '../types/router';
import type {
  RetryEvent,
  FallbackEvent,
  CooldownEvent,
} from '../types/requests';
import { StrategyRouter } from './strategies';
import type { SilkboardEventEmitter } from '../events';

export interface RouterOptions {
  config: RoutingConfig;
  eventEmitter?: SilkboardEventEmitter;
  /** Function to resolve role to model (for role-based mode) */
  roleResolver?: (role: string, variant?: string) => string;
}

/**
 * Router handles model selection based on routing configuration.
 */
export class Router {
  private config: RoutingConfig;
  private eventEmitter?: SilkboardEventEmitter;
  private roleResolver?: (role: string, variant?: string) => string;
  private strategyRouter: StrategyRouter;
  private health: Map<string, DeploymentHealth> = new Map();
  private cooldowns: Map<string, Date> = new Map();

  constructor(options: RouterOptions) {
    this.config = options.config;
    this.eventEmitter = options.eventEmitter;
    this.roleResolver = options.roleResolver;
    this.strategyRouter = new StrategyRouter();
  }

  /**
   * Route a request to a model based on configuration.
   */
  route(context: RouterContext): RoutingResult {
    switch (this.config.mode) {
      case 'none':
        return this.routeNone(context);
      case 'role-based':
        return this.routeRoleBased(context);
      case 'strategy':
        return this.routeStrategy(context);
      case 'conditional':
        return this.routeConditional(context);
      default:
        throw new Error(`Unknown routing mode: ${(this.config as any).mode}`);
    }
  }

  /**
   * Mode: none - pass-through, require explicit model.
   */
  private routeNone(context: RouterContext): RoutingResult {
    if (!context.model) {
      throw new Error('Routing mode is "none" but no model specified');
    }
    return {
      model: context.model,
      reason: 'direct',
      attempt: 1,
    };
  }

  /**
   * Mode: role-based - use role resolver to get model.
   */
  private routeRoleBased(context: RouterContext): RoutingResult {
    // Direct model takes precedence
    if (context.model) {
      return {
        model: context.model,
        reason: 'direct',
        attempt: 1,
      };
    }

    // Use role resolver
    if (context.role && this.roleResolver) {
      const model = this.roleResolver(context.role, context.variant);
      return {
        model,
        reason: 'role',
        attempt: 1,
      };
    }

    // Fall back to default model
    const config = this.config as { mode: 'role-based'; defaultModel?: string };
    if (config.defaultModel) {
      return {
        model: config.defaultModel,
        reason: 'default',
        attempt: 1,
      };
    }

    throw new Error('No model, role, or default model specified');
  }

  /**
   * Mode: strategy - use routing strategy to select from deployments.
   */
  private routeStrategy(context: RouterContext): RoutingResult {
    // Direct model takes precedence
    if (context.model) {
      return {
        model: context.model,
        reason: 'direct',
        attempt: 1,
      };
    }

    const config = this.config as StrategyRoutingConfig;
    const strategy = this.strategyRouter.getStrategy(config.strategy);

    // Filter out cooled-down deployments
    const availableDeployments = config.deployments.filter(
      (d) => !this.isInCooldown(d.model)
    );

    if (availableDeployments.length === 0) {
      throw new Error('No available deployments (all in cooldown)');
    }

    const selected = strategy(availableDeployments, this.health, {
      estimatedCost: this.estimateCost(context),
    });

    if (!selected) {
      throw new Error('No deployment selected by strategy');
    }

    return {
      model: selected.model,
      reason: 'strategy',
      attempt: 1,
    };
  }

  /**
   * Mode: conditional - evaluate conditions to select model.
   */
  private routeConditional(context: RouterContext): RoutingResult {
    // Direct model takes precedence
    if (context.model) {
      return {
        model: context.model,
        reason: 'direct',
        attempt: 1,
      };
    }

    const config = this.config as ConditionalRoutingConfig;

    // Evaluate conditions in order
    for (const condition of config.conditions) {
      if (this.evaluateCondition(condition.when, context.metadata ?? {})) {
        return {
          model: condition.then.model,
          reason: 'condition',
          attempt: 1,
        };
      }
    }

    // No condition matched, use default
    return {
      model: config.default.model,
      reason: 'default',
      attempt: 1,
    };
  }

  /**
   * Get fallback model for a failed model.
   */
  getFallback(failedModel: string): string | null {
    const fallbacks = this.getFallbackConfig();
    if (!fallbacks) return null;

    const fallbackConfig = fallbacks.find((f) => f.from === failedModel);
    if (!fallbackConfig || fallbackConfig.to.length === 0) return null;

    // Find first available fallback not in cooldown
    for (const model of fallbackConfig.to) {
      if (!this.isInCooldown(model)) {
        return model;
      }
    }

    return null;
  }

  /**
   * Record a successful request for health tracking.
   */
  recordSuccess(model: string, latencyMs: number): void {
    const health = this.getOrCreateHealth(model);
    health.healthy = true;
    health.consecutiveFailures = 0;
    health.requestCount++;
    
    // Update average latency (exponential moving average)
    if (health.averageLatencyMs === undefined) {
      health.averageLatencyMs = latencyMs;
    } else {
      health.averageLatencyMs = health.averageLatencyMs * 0.9 + latencyMs * 0.1;
    }
  }

  /**
   * Record a failed request for health tracking.
   */
  recordFailure(model: string, error: Error): void {
    const health = this.getOrCreateHealth(model);
    health.consecutiveFailures++;
    health.lastError = error;
    health.lastErrorTime = new Date();
    health.requestCount++;

    // Check if we should enter cooldown
    const cooldownConfig = this.getCooldownConfig();
    if (cooldownConfig && health.consecutiveFailures >= cooldownConfig.failureThreshold) {
      this.enterCooldown(model, cooldownConfig.cooldownSeconds, error);
    }
  }

  /**
   * Get retry configuration.
   */
  getRetryConfig(): RetryConfig | undefined {
    if (this.config.mode === 'strategy') {
      return (this.config as StrategyRoutingConfig).retry;
    }
    if (this.config.mode === 'conditional') {
      return (this.config as ConditionalRoutingConfig).retry;
    }
    return undefined;
  }

  /**
   * Calculate retry delay with exponential backoff.
   */
  calculateRetryDelay(attempt: number): number {
    const config = this.getRetryConfig();
    const initialDelay = config?.initialDelayMs ?? 1000;
    const maxDelay = config?.maxDelayMs ?? 30000;
    const multiplier = config?.backoffMultiplier ?? 2;

    const delay = initialDelay * Math.pow(multiplier, attempt - 1);
    // Add jitter (±10%)
    const jitter = delay * 0.1 * (Math.random() * 2 - 1);
    return Math.min(delay + jitter, maxDelay);
  }

  /**
   * Check if an error is retryable.
   */
  isRetryableError(error: Error): boolean {
    const config = this.getRetryConfig();
    if (!config?.retryableErrors) {
      // Default retryable errors
      const defaultRetryable = [
        'RATE_LIMIT',
        'TIMEOUT',
        'SERVICE_UNAVAILABLE',
        'INTERNAL_ERROR',
        '429',
        '500',
        '502',
        '503',
        '504',
      ];
      return defaultRetryable.some(
        (e) => error.message.includes(e) || error.name.includes(e)
      );
    }
    return config.retryableErrors.some(
      (e) => error.message.includes(e) || error.name.includes(e)
    );
  }

  /**
   * Emit retry event.
   */
  emitRetryEvent(event: Omit<RetryEvent, 'timestamp' | 'delayMs'> & { nextDelayMs: number }): void {
    this.eventEmitter?.emit('retry', {
      ...event,
      delayMs: event.nextDelayMs,
      timestamp: new Date(),
    });
  }

  /**
   * Emit fallback event.
   */
  emitFallbackEvent(event: Omit<FallbackEvent, 'timestamp'>): void {
    this.eventEmitter?.emit('fallback', {
      ...event,
      timestamp: new Date(),
    });
  }

  /**
   * Get deployment health status.
   */
  getHealth(): Map<string, DeploymentHealth> {
    return new Map(this.health);
  }

  /**
   * Reset all health tracking (useful for testing).
   */
  resetHealth(): void {
    this.health.clear();
    this.cooldowns.clear();
    this.strategyRouter.resetRoundRobin();
  }

  // Private helpers

  private getOrCreateHealth(model: string): DeploymentHealth {
    let health = this.health.get(model);
    if (!health) {
      health = {
        model,
        healthy: true,
        consecutiveFailures: 0,
        requestCount: 0,
      };
      this.health.set(model, health);
    }
    return health;
  }

  private isInCooldown(model: string): boolean {
    const cooldownUntil = this.cooldowns.get(model);
    if (!cooldownUntil) return false;
    if (new Date() >= cooldownUntil) {
      this.cooldowns.delete(model);
      // Reset health when coming out of cooldown
      const health = this.health.get(model);
      if (health) {
        health.healthy = true;
        health.consecutiveFailures = 0;
      }
      return false;
    }
    return true;
  }

  private enterCooldown(model: string, seconds: number, error: Error): void {
    const cooldownUntil = new Date(Date.now() + seconds * 1000);
    this.cooldowns.set(model, cooldownUntil);

    const health = this.health.get(model);
    if (health) {
      health.healthy = false;
    }

    // Emit cooldown event
    const event: CooldownEvent = {
      model,
      reason: error.message,
      cooldownUntil,
      consecutiveFailures: health?.consecutiveFailures ?? 0,
      timestamp: new Date(),
    };
    this.eventEmitter?.emit('cooldown', event);
  }

  private getFallbackConfig(): FallbackConfig[] | undefined {
    if (this.config.mode === 'strategy') {
      return (this.config as StrategyRoutingConfig).fallbacks;
    }
    if (this.config.mode === 'conditional') {
      return (this.config as ConditionalRoutingConfig).fallbacks;
    }
    return undefined;
  }

  private getCooldownConfig(): CooldownConfig | undefined {
    if (this.config.mode === 'strategy') {
      return (this.config as StrategyRoutingConfig).cooldown;
    }
    return undefined;
  }

  private evaluateCondition(
    condition: Record<string, unknown>,
    metadata: Record<string, unknown>
  ): boolean {
    for (const [path, expectedValue] of Object.entries(condition)) {
      const actualValue = this.getNestedValue(metadata, path);
      if (actualValue !== expectedValue) {
        return false;
      }
    }
    return true;
  }

  private getNestedValue(obj: Record<string, unknown>, path: string): unknown {
    const parts = path.split('.');
    let current: unknown = obj;
    for (const part of parts) {
      if (current === null || current === undefined) return undefined;
      current = (current as Record<string, unknown>)[part];
    }
    return current;
  }

  private estimateCost(context: RouterContext): number | undefined {
    if (!context.estimatedInputTokens && !context.estimatedOutputTokens) {
      return undefined;
    }
    // Simple cost estimation - actual implementation would use CostTracker
    return (context.estimatedInputTokens ?? 0) + (context.estimatedOutputTokens ?? 0);
  }
}

/**
 * Create a router with the given configuration.
 */
export function createRouter(options: RouterOptions): Router {
  return new Router(options);
}
