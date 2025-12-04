/**
 * Vault types for secure API key management.
 * 
 * The vault system provides a pluggable interface for secret management,
 * allowing users to integrate with their preferred secret storage solution.
 */

/**
 * Interface for secret/API key management.
 * 
 * Implement this interface to integrate with your secret management solution
 * (AWS Secrets Manager, HashiCorp Vault, Azure Key Vault, etc.)
 * 
 * @example
 * ```typescript
 * // AWS Secrets Manager implementation
 * class AWSSecretsVault implements VaultService {
 *   private client: SecretsManagerClient;
 *   
 *   async getSecret(keyName: string): Promise<string> {
 *     const response = await this.client.send(
 *       new GetSecretValueCommand({ SecretId: keyName })
 *     );
 *     return response.SecretString ?? '';
 *   }
 * }
 * ```
 */
export interface VaultService {
  /**
   * Get a secret value by key name.
   * 
   * @param keyName - The name/identifier of the secret
   * @returns The secret value, or empty string if not found
   */
  getSecret(keyName: string): Promise<string>;

  /**
   * Rotate a secret (optional).
   * Only implement if your vault supports secret rotation.
   * 
   * @param keyName - The name/identifier of the secret to rotate
   * @returns The new secret value after rotation
   */
  rotateSecret?(keyName: string): Promise<string>;

  /**
   * Check if a secret exists (optional).
   * 
   * @param keyName - The name/identifier of the secret
   * @returns True if the secret exists
   */
  hasSecret?(keyName: string): Promise<boolean>;

  /**
   * List all available secret names (optional).
   * 
   * @returns Array of secret names
   */
  listSecrets?(): Promise<string[]>;
}

/**
 * Configuration for the vault system.
 */
export interface VaultConfig {
  /**
   * Custom vault implementation.
   * If not provided, EnvVault (environment variables) is used.
   */
  vault?: VaultService;

  /**
   * Key name mappings for aliasing.
   * Maps virtual key names to actual secret names.
   * 
   * @example
   * ```typescript
   * {
   *   keyMappings: {
   *     'openai': 'OPENAI_API_KEY',
   *     'anthropic': 'ANTHROPIC_API_KEY',
   *   }
   * }
   * ```
   */
  keyMappings?: Record<string, string>;

  /**
   * Prefix to prepend to all key lookups.
   * Useful for namespacing secrets.
   * 
   * @example
   * ```typescript
   * // With prefix 'SILKBOARD_', looking up 'openai' 
   * // will actually look up 'SILKBOARD_openai'
   * { keyPrefix: 'SILKBOARD_' }
   * ```
   */
  keyPrefix?: string;

  /**
   * Whether to cache secrets in memory.
   * @default true
   */
  cacheSecrets?: boolean;

  /**
   * Cache TTL in milliseconds.
   * Only used if cacheSecrets is true.
   * @default 300000 (5 minutes)
   */
  cacheTtlMs?: number;
}

/**
 * Result of a secret lookup with metadata.
 */
export interface SecretResult {
  /** The secret value */
  value: string;
  
  /** Whether the value was retrieved from cache */
  fromCache: boolean;
  
  /** The resolved key name (after mappings/prefix) */
  resolvedKey: string;
}
