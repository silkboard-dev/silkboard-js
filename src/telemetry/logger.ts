/**
 * Pluggable logger interface for Silkboard.
 * 
 * @example
 * ```typescript
 * // Use with console
 * const silk = new Silkboard({
 *   modelsConfig,
 *   logger: consoleLogger,
 * });
 * 
 * // Use with pino
 * import pino from 'pino';
 * const pinoInstance = pino();
 * const silk = new Silkboard({
 *   modelsConfig,
 *   logger: {
 *     debug: (msg, meta) => pinoInstance.debug(meta, msg),
 *     info: (msg, meta) => pinoInstance.info(meta, msg),
 *     warn: (msg, meta) => pinoInstance.warn(meta, msg),
 *     error: (msg, err, meta) => pinoInstance.error({ ...meta, err }, msg),
 *   },
 * });
 * ```
 */
export interface SilkboardLogger {
  debug(message: string, meta?: Record<string, unknown>): void;
  info(message: string, meta?: Record<string, unknown>): void;
  warn(message: string, meta?: Record<string, unknown>): void;
  error(message: string, error?: Error, meta?: Record<string, unknown>): void;
}

/**
 * Console-based logger implementation.
 */
export const consoleLogger: SilkboardLogger = {
  debug(message: string, meta?: Record<string, unknown>) {
    if (process.env.DEBUG) {
      console.debug(`[Silkboard] ${message}`, meta ?? '');
    }
  },
  info(message: string, meta?: Record<string, unknown>) {
    console.info(`[Silkboard] ${message}`, meta ?? '');
  },
  warn(message: string, meta?: Record<string, unknown>) {
    console.warn(`[Silkboard] ${message}`, meta ?? '');
  },
  error(message: string, error?: Error, meta?: Record<string, unknown>) {
    console.error(`[Silkboard] ${message}`, error ?? '', meta ?? '');
  },
};

/**
 * No-op logger for silent operation.
 */
export const noopLogger: SilkboardLogger = {
  debug() {},
  info() {},
  warn() {},
  error() {},
};

/**
 * Creates a logger with a custom prefix.
 */
export function createPrefixedLogger(
  prefix: string,
  baseLogger: SilkboardLogger = consoleLogger
): SilkboardLogger {
  return {
    debug(message, meta) {
      baseLogger.debug(`[${prefix}] ${message}`, meta);
    },
    info(message, meta) {
      baseLogger.info(`[${prefix}] ${message}`, meta);
    },
    warn(message, meta) {
      baseLogger.warn(`[${prefix}] ${message}`, meta);
    },
    error(message, error, meta) {
      baseLogger.error(`[${prefix}] ${message}`, error, meta);
    },
  };
}
