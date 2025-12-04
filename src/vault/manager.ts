/**
 * Vault manager with caching and key mapping support.
 */

import type { VaultService, VaultConfig, SecretResult } from '../types';
import { EnvVault } from './env';

/** Default cache TTL: 5 minutes */
const DEFAULT_CACHE_TTL_MS = 5 * 60 * 1000;

interface CacheEntry {
  value: string;
  expiresAt: number;
}

/**
 * Vault manager that wraps a VaultService with additional features:
 * - Key name mappings (aliases)
 * - Key prefix support
 * - In-memory caching with TTL
 * 
 * @example
 * ```typescript
 * const vault = new VaultManager({
 *   keyMappings: {
 *     'openai': 'OPENAI_API_KEY',
 *     'anthropic': 'ANTHROPIC_API_KEY',
 *   },
 *   cacheSecrets: true,
 *   cacheTtlMs: 60000, // 1 minute
 * });
 * 
 * // Gets OPENAI_API_KEY from environment
 * const key = await vault.getSecret('openai');
 * ```
 */
export class VaultManager implements VaultService {
  private vault: VaultService;
  private keyMappings: Record<string, string>;
  private keyPrefix: string;
  private cacheEnabled: boolean;
  private cacheTtlMs: number;
  private cache: Map<string, CacheEntry> = new Map();

  constructor(config: VaultConfig = {}) {
    this.vault = config.vault ?? new EnvVault();
    this.keyMappings = config.keyMappings ?? {};
    this.keyPrefix = config.keyPrefix ?? '';
    this.cacheEnabled = config.cacheSecrets ?? true;
    this.cacheTtlMs = config.cacheTtlMs ?? DEFAULT_CACHE_TTL_MS;
  }

  /**
   * Get a secret by key name.
   * Applies key mappings and prefix before lookup.
   * 
   * @param keyName - Virtual key name
   * @returns The secret value
   */
  async getSecret(keyName: string): Promise<string> {
    const result = await this.getSecretWithMetadata(keyName);
    return result.value;
  }

  /**
   * Get a secret with additional metadata.
   * 
   * @param keyName - Virtual key name
   * @returns Secret result with value and metadata
   */
  async getSecretWithMetadata(keyName: string): Promise<SecretResult> {
    const resolvedKey = this.resolveKeyName(keyName);

    // Check cache first
    if (this.cacheEnabled) {
      const cached = this.getFromCache(resolvedKey);
      if (cached !== null) {
        return {
          value: cached,
          fromCache: true,
          resolvedKey,
        };
      }
    }

    // Fetch from vault
    const value = await this.vault.getSecret(resolvedKey);

    // Cache the result
    if (this.cacheEnabled) {
      this.setInCache(resolvedKey, value);
    }

    return {
      value,
      fromCache: false,
      resolvedKey,
    };
  }

  /**
   * Check if a secret exists.
   * 
   * @param keyName - Virtual key name
   * @returns True if the secret exists
   */
  async hasSecret(keyName: string): Promise<boolean> {
    const resolvedKey = this.resolveKeyName(keyName);

    // Check cache first
    if (this.cacheEnabled && this.cache.has(resolvedKey)) {
      const entry = this.cache.get(resolvedKey)!;
      if (Date.now() < entry.expiresAt) {
        return entry.value !== '';
      }
    }

    // Check underlying vault
    if (this.vault.hasSecret) {
      return this.vault.hasSecret(resolvedKey);
    }

    // Fallback: try to get the secret
    const value = await this.vault.getSecret(resolvedKey);
    return value !== '';
  }

  /**
   * Rotate a secret (if supported by underlying vault).
   * 
   * @param keyName - Virtual key name
   * @returns The new secret value
   * @throws Error if rotation is not supported
   */
  async rotateSecret(keyName: string): Promise<string> {
    if (!this.vault.rotateSecret) {
      throw new Error('Secret rotation is not supported by this vault');
    }

    const resolvedKey = this.resolveKeyName(keyName);
    const newValue = await this.vault.rotateSecret(resolvedKey);

    // Update cache with new value
    if (this.cacheEnabled) {
      this.setInCache(resolvedKey, newValue);
    }

    return newValue;
  }

  /**
   * Clear the secret cache.
   * Useful after known secret updates.
   */
  clearCache(): void {
    this.cache.clear();
  }

  /**
   * Invalidate a specific cached secret.
   * 
   * @param keyName - Virtual key name to invalidate
   */
  invalidateCache(keyName: string): void {
    const resolvedKey = this.resolveKeyName(keyName);
    this.cache.delete(resolvedKey);
  }

  /**
   * Add or update a key mapping.
   * 
   * @param virtualName - The alias/virtual name
   * @param actualName - The actual secret name
   */
  addKeyMapping(virtualName: string, actualName: string): void {
    this.keyMappings[virtualName] = actualName;
  }

  /**
   * Get the underlying vault service.
   */
  getUnderlyingVault(): VaultService {
    return this.vault;
  }

  /**
   * Resolve a virtual key name to the actual secret name.
   */
  private resolveKeyName(keyName: string): string {
    // Apply mapping first
    const mapped = this.keyMappings[keyName] ?? keyName;
    
    // Then apply prefix
    return this.keyPrefix + mapped;
  }

  private getFromCache(key: string): string | null {
    const entry = this.cache.get(key);
    if (!entry) return null;

    if (Date.now() >= entry.expiresAt) {
      this.cache.delete(key);
      return null;
    }

    return entry.value;
  }

  private setInCache(key: string, value: string): void {
    this.cache.set(key, {
      value,
      expiresAt: Date.now() + this.cacheTtlMs,
    });
  }
}

/**
 * Create a new VaultManager instance.
 */
export function createVaultManager(config?: VaultConfig): VaultManager {
  return new VaultManager(config);
}
