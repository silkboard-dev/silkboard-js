/**
 * Centralized event emitter for Silkboard SDK.
 * 
 * Provides a type-safe event system for observability across all SDK operations.
 * Events are emitted at key lifecycle points: start, complete, error, retry, fallback, cache.
 * 
 * @example
 * ```typescript
 * const emitter = new SilkboardEventEmitter();
 * 
 * emitter.on('start', ({ requestId, model }) => {
 *   console.log(`Request ${requestId} started with model ${model}`);
 * });
 * 
 * emitter.on('error', ({ error, willRetry }) => {
 *   if (!willRetry) {
 *     alerting.notify(error);
 *   }
 * });
 * ```
 */

import type {
  SilkboardEvent,
  SilkboardEventHandler,
} from '../types';

/**
 * Type-safe event emitter for Silkboard events.
 * 
 * Supports multiple handlers per event type and provides
 * error isolation (one handler's error doesn't affect others).
 */
export class SilkboardEventEmitter {
  private handlers: Map<keyof SilkboardEvent, Set<SilkboardEventHandler<any>>> = new Map();

  /**
   * Register an event handler.
   * 
   * @param event - Event type to listen for
   * @param handler - Callback function to invoke when event is emitted
   * 
   * @example
   * ```typescript
   * emitter.on('complete', ({ latencyMs }) => {
   *   metrics.timing('request.latency', latencyMs);
   * });
   * ```
   */
  on<K extends keyof SilkboardEvent>(
    event: K,
    handler: SilkboardEventHandler<K>
  ): void {
    if (!this.handlers.has(event)) {
      this.handlers.set(event, new Set());
    }
    this.handlers.get(event)!.add(handler);
  }

  /**
   * Remove an event handler.
   * 
   * @param event - Event type to stop listening for
   * @param handler - The handler function to remove
   */
  off<K extends keyof SilkboardEvent>(
    event: K,
    handler: SilkboardEventHandler<K>
  ): void {
    this.handlers.get(event)?.delete(handler);
  }

  /**
   * Emit an event to all registered handlers.
   * 
   * Handlers are invoked synchronously. Errors in handlers are caught
   * and logged, but don't prevent other handlers from being called.
   * 
   * @param event - Event type to emit
   * @param data - Event payload
   */
  emit<K extends keyof SilkboardEvent>(
    event: K,
    data: SilkboardEvent[K]
  ): void {
    const handlers = this.handlers.get(event);
    if (handlers) {
      for (const handler of handlers) {
        try {
          handler(data);
        } catch (error) {
          // Log but don't throw - one handler's error shouldn't affect others
          console.error(`[SilkboardEventEmitter] Handler error for '${event}':`, error);
        }
      }
    }
  }

  /**
   * Remove all handlers for a specific event type, or all handlers if no event specified.
   * 
   * @param event - Optional event type to clear handlers for
   */
  removeAllListeners(event?: keyof SilkboardEvent): void {
    if (event) {
      this.handlers.delete(event);
    } else {
      this.handlers.clear();
    }
  }

  /**
   * Get the number of handlers registered for an event type.
   * 
   * @param event - Event type to check
   * @returns Number of registered handlers
   */
  listenerCount(event: keyof SilkboardEvent): number {
    return this.handlers.get(event)?.size ?? 0;
  }

  /**
   * Check if any handlers are registered for an event type.
   * 
   * @param event - Event type to check
   * @returns True if at least one handler is registered
   */
  hasListeners(event: keyof SilkboardEvent): boolean {
    return this.listenerCount(event) > 0;
  }
}

/**
 * Generate a unique request ID for event correlation.
 * 
 * Uses a combination of timestamp and random string for uniqueness.
 * Format: `req_<timestamp>_<random>`
 * 
 * @returns Unique request ID string
 * 
 * @example
 * ```typescript
 * const requestId = generateRequestId();
 * // => "req_1701705600000_a1b2c3d4"
 * ```
 */
export function generateRequestId(): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 10);
  return `req_${timestamp}_${random}`;
}

/**
 * Create a new SilkboardEventEmitter instance.
 * 
 * @returns New event emitter instance
 */
export function createEventEmitter(): SilkboardEventEmitter {
  return new SilkboardEventEmitter();
}
