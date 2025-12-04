/**
 * Telemetry module for logging and metrics.
 */

export {
  type SilkboardLogger,
  consoleLogger,
  noopLogger,
  createPrefixedLogger,
} from './logger';

export {
  type SilkboardMetrics,
  noopMetrics,
  consoleMetrics,
  MetricNames,
} from './metrics';
