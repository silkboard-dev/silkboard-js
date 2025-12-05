/**
 * Router module - model selection and routing strategies.
 */

export { Router, createRouter } from './router';
export type { RouterOptions } from './router';
export { StrategyRouter } from './strategies';
export type {
  RoutingConfig,
  RoutingMode,
  RoutingStrategy,
  RouterContext,
  RoutingResult,
  Deployment,
  DeploymentHealth,
  FallbackConfig,
  CooldownConfig,
  RetryConfig,
  NoneRoutingConfig,
  RoleBasedRoutingConfig,
  StrategyRoutingConfig,
  ConditionalRoutingConfig,
  RoutingCondition,
} from '../types/router';
