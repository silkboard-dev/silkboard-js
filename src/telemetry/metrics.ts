/**
 * Pluggable metrics interface for Silkboard observability.
 * 
 * @example
 * ```typescript
 * // Use with StatsD
 * import StatsD from 'hot-shots';
 * const statsd = new StatsD();
 * 
 * const silk = new Silkboard({
 *   modelsConfig,
 *   metrics: {
 *     increment: (metric, tags) => statsd.increment(metric, tags),
 *     timing: (metric, ms, tags) => statsd.timing(metric, ms, tags),
 *     gauge: (metric, value, tags) => statsd.gauge(metric, value, tags),
 *   },
 * });
 * 
 * // Use with Prometheus
 * import { Counter, Histogram, Gauge } from 'prom-client';
 * // ... setup prometheus metrics
 * ```
 */
export interface SilkboardMetrics {
  /**
   * Increment a counter metric.
   * @param metric - Metric name (e.g., 'silkboard.request.count')
   * @param tags - Optional tags for the metric
   */
  increment(metric: string, tags?: Record<string, string>): void;

  /**
   * Record a timing/histogram metric.
   * @param metric - Metric name (e.g., 'silkboard.request.latency_ms')
   * @param durationMs - Duration in milliseconds
   * @param tags - Optional tags for the metric
   */
  timing(metric: string, durationMs: number, tags?: Record<string, string>): void;

  /**
   * Set a gauge metric value.
   * @param metric - Metric name (e.g., 'silkboard.active_requests')
   * @param value - Current value
   * @param tags - Optional tags for the metric
   */
  gauge(metric: string, value: number, tags?: Record<string, string>): void;
}

/**
 * No-op metrics implementation for when metrics are not needed.
 */
export const noopMetrics: SilkboardMetrics = {
  increment() {},
  timing() {},
  gauge() {},
};

/**
 * Console-based metrics for debugging.
 */
export const consoleMetrics: SilkboardMetrics = {
  increment(metric: string, tags?: Record<string, string>) {
    console.log(`[Metrics] INCREMENT ${metric}`, tags ?? '');
  },
  timing(metric: string, durationMs: number, tags?: Record<string, string>) {
    console.log(`[Metrics] TIMING ${metric}: ${durationMs}ms`, tags ?? '');
  },
  gauge(metric: string, value: number, tags?: Record<string, string>) {
    console.log(`[Metrics] GAUGE ${metric}: ${value}`, tags ?? '');
  },
};

/**
 * Standard Silkboard metric names.
 */
export const MetricNames = {
  REQUEST_COUNT: 'silkboard.request.count',
  REQUEST_LATENCY: 'silkboard.request.latency_ms',
  TOKENS_INPUT: 'silkboard.request.tokens.input',
  TOKENS_OUTPUT: 'silkboard.request.tokens.output',
  TOKENS_CACHED: 'silkboard.request.tokens.cached',
  TOKENS_REASONING: 'silkboard.request.tokens.reasoning',
  COST_USD: 'silkboard.request.cost_usd',
  ERROR_COUNT: 'silkboard.error.count',
  CACHE_HIT: 'silkboard.cache.hit',
  CACHE_MISS: 'silkboard.cache.miss',
} as const;
