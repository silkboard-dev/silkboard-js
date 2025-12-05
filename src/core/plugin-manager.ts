/**
 * Plugin Manager
 * 
 * Manages plugin lifecycle: initialization, hook execution, and cleanup.
 */

import type {
  SilkboardPlugin,
  SilkboardCore,
  RequestContext,
  ResultContext,
} from '../types/plugin';

export class PluginManager {
  private plugins: SilkboardPlugin[] = [];
  private initialized = false;
  private extensions: Record<string, unknown> = {};

  /**
   * Register plugins (before initialization).
   */
  register(plugins: SilkboardPlugin[]): void {
    if (this.initialized) {
      throw new Error('Cannot register plugins after initialization');
    }

    // Deduplicate by name
    const names = new Set(this.plugins.map(p => p.name));
    for (const plugin of plugins) {
      if (names.has(plugin.name)) {
        console.warn(`Plugin "${plugin.name}" already registered, skipping duplicate`);
        continue;
      }
      names.add(plugin.name);
      this.plugins.push(plugin);
    }
  }

  /**
   * Initialize all plugins.
   * Called once when Silkboard is created.
   */
  async initialize(silk: SilkboardCore): Promise<void> {
    if (this.initialized) {
      throw new Error('PluginManager already initialized');
    }

    // Initialize plugins in order
    for (const plugin of this.plugins) {
      try {
        if (plugin.onInit) {
          await plugin.onInit(silk);
        }
      } catch (error) {
        console.error(`Failed to initialize plugin "${plugin.name}":`, error);
        throw error;
      }
    }

    // Collect extensions
    for (const plugin of this.plugins) {
      if (plugin.extend) {
        const ext = plugin.extend(silk);
        if (ext) {
          // Check for conflicts
          for (const key of Object.keys(ext)) {
            if (key in this.extensions) {
              console.warn(
                `Plugin "${plugin.name}" extension "${key}" conflicts with existing. Last wins.`
              );
            }
          }
          Object.assign(this.extensions, ext);
        }
      }
    }

    this.initialized = true;
  }

  /**
   * Get all collected extensions.
   * These should be mixed into the Silkboard instance.
   */
  getExtensions(): Record<string, unknown> {
    return this.extensions;
  }

  /**
   * Execute onBeforeRequest hooks for all plugins.
   */
  async beforeRequest(ctx: RequestContext): Promise<void> {
    for (const plugin of this.plugins) {
      if (plugin.onBeforeRequest) {
        try {
          await plugin.onBeforeRequest(ctx);
        } catch (error) {
          console.error(`Plugin "${plugin.name}" onBeforeRequest failed:`, error);
          // Continue with other plugins
        }
      }
    }
  }

  /**
   * Execute onAfterRequest hooks for all plugins.
   */
  async afterRequest(ctx: ResultContext, result: unknown): Promise<void> {
    for (const plugin of this.plugins) {
      if (plugin.onAfterRequest) {
        try {
          await plugin.onAfterRequest(ctx, result);
        } catch (error) {
          console.error(`Plugin "${plugin.name}" onAfterRequest failed:`, error);
          // Continue with other plugins
        }
      }
    }
  }

  /**
   * Execute onError hooks for all plugins.
   */
  async onError(ctx: RequestContext, error: Error): Promise<void> {
    for (const plugin of this.plugins) {
      if (plugin.onError) {
        try {
          await plugin.onError(ctx, error);
        } catch (pluginError) {
          console.error(`Plugin "${plugin.name}" onError failed:`, pluginError);
          // Continue with other plugins
        }
      }
    }
  }

  /**
   * Destroy all plugins (cleanup).
   */
  async destroy(): Promise<void> {
    // Destroy in reverse order
    for (const plugin of [...this.plugins].reverse()) {
      if (plugin.onDestroy) {
        try {
          await plugin.onDestroy();
        } catch (error) {
          console.error(`Plugin "${plugin.name}" onDestroy failed:`, error);
          // Continue with other plugins
        }
      }
    }
    this.plugins = [];
    this.extensions = {};
    this.initialized = false;
  }

  /**
   * Get list of registered plugin names.
   */
  getPluginNames(): string[] {
    return this.plugins.map(p => p.name);
  }

  /**
   * Check if a plugin is registered.
   */
  hasPlugin(name: string): boolean {
    return this.plugins.some(p => p.name === name);
  }
}
