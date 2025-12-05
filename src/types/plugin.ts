/**
 * Silkboard Plugin System
 * 
 * Plugins extend Silkboard with additional functionality like reasoning,
 * cost tracking, caching, etc. This enables modular builds where users
 * only include the features they need.
 */

import type { ResolvedModel } from './index';

/**
 * Context passed to plugin hooks during request lifecycle.
 */
export interface RequestContext {
  /** Unique request identifier */
  requestId: string;
  
  /** Resolved model information */
  model: ResolvedModel;
  
  /** Request type */
  type: 'streamText' | 'generateText' | 'embed' | 'rerank';
  
  /** Original request options */
  options: Record<string, unknown>;
  
  /** Request start timestamp */
  startTime: number;
  
  /** Mutable metadata - plugins can add data here */
  metadata: Record<string, unknown>;
}

/**
 * Result context passed after request completion.
 */
export interface ResultContext extends RequestContext {
  /** Request end timestamp */
  endTime: number;
  
  /** Latency in milliseconds */
  latencyMs: number;
  
  /** Token usage if available */
  usage?: {
    inputTokens: number;
    outputTokens: number;
    cachedTokens?: number;
    reasoningTokens?: number;
  };
}

/**
 * Core Silkboard interface that plugins receive.
 * This is a subset of the full Silkboard class.
 */
export interface SilkboardCore {
  /** Get model configuration by alias */
  getModelConfig(alias: string): Record<string, unknown>;
  
  /** Resolve role/variant to model alias */
  resolveModelAlias(options: { model?: string; role?: string; variant?: string }): string;
  
  /** Emit an event */
  emit(event: string, data: unknown): void;
  
  /** Subscribe to events */
  on(event: string, handler: (data: unknown) => void): void;
  
  /** Get configuration value */
  getConfig<T = unknown>(key: string): T | undefined;
}

/**
 * Plugin definition interface.
 * 
 * Plugins can hook into the request lifecycle and extend the Silkboard
 * instance with new methods and properties.
 * 
 * @example
 * ```typescript
 * const myPlugin = (): SilkboardPlugin => ({
 *   name: 'my-plugin',
 *   
 *   onInit(silk) {
 *     console.log('Plugin initialized');
 *   },
 *   
 *   onBeforeRequest(ctx) {
 *     ctx.metadata.myData = 'hello';
 *   },
 *   
 *   extend(silk) {
 *     return {
 *       myMethod() {
 *         return 'extended!';
 *       }
 *     };
 *   }
 * });
 * ```
 */
export interface SilkboardPlugin {
  /** Unique plugin name (used for debugging and deduplication) */
  name: string;
  
  /**
   * Called once when Silkboard initializes.
   * Use for setup, validation, and registering resources.
   */
  onInit?(silk: SilkboardCore): void | Promise<void>;
  
  /**
   * Called before each LLM request.
   * Can modify request options via context.metadata.
   */
  onBeforeRequest?(ctx: RequestContext): void | Promise<void>;
  
  /**
   * Called after successful request completion.
   * Receives result and can perform post-processing.
   */
  onAfterRequest?(ctx: ResultContext, result: unknown): void | Promise<void>;
  
  /**
   * Called when a request fails.
   * Can log errors, record metrics, or trigger fallbacks.
   */
  onError?(ctx: RequestContext, error: Error): void | Promise<void>;
  
  /**
   * Called when Silkboard is destroyed.
   * Use for cleanup (close connections, flush buffers, etc.)
   */
  onDestroy?(): void | Promise<void>;
  
  /**
   * Extend the Silkboard instance with new methods/properties.
   * The returned object is merged into the Silkboard instance.
   * 
   * @returns Object with methods/properties to add to Silkboard
   */
  extend?(silk: SilkboardCore): Record<string, unknown>;
}

/**
 * Plugin factory function type.
 * Plugins are typically created via factory functions for configuration.
 * 
 * @example
 * ```typescript
 * const costPlugin = (options?: CostPluginOptions): SilkboardPlugin => ({
 *   name: 'cost',
 *   // ... plugin implementation
 * });
 * ```
 */
export type PluginFactory<TOptions = void> = TOptions extends void
  ? () => SilkboardPlugin
  : (options?: TOptions) => SilkboardPlugin;

/**
 * Configuration for createSilkboard factory.
 */
export interface CreateSilkboardOptions {
  /** Path to models.yaml or inline config */
  modelsConfig: string | Record<string, unknown>;
  
  /** Path to roles.yaml or inline config (optional) */
  rolesConfig?: string | Record<string, unknown>;
  
  /** Path to routing.yaml or inline config (optional) */
  routingConfig?: string | Record<string, unknown>;
  
  /** Path to provider registry (optional) */
  registryPath?: string;
  
  /** Environment name for config resolution */
  environment?: string;
  
  /** Plugins to enable */
  plugins?: SilkboardPlugin[];
  
  /** Emit stream chunk events (default: false) */
  emitStreamEvents?: boolean;
}

/**
 * Type helper for inferring Silkboard instance type based on plugins.
 * This enables TypeScript to know which methods are available.
 */
export type SilkboardWithPlugins<TPlugins extends SilkboardPlugin[]> = 
  SilkboardCore & UnionToIntersection<ReturnType<NonNullable<TPlugins[number]['extend']>>>;

/**
 * Helper type to merge plugin extensions.
 */
type UnionToIntersection<U> = 
  (U extends unknown ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never;
