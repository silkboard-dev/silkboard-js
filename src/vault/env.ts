/**
 * Environment variable vault implementation.
 * 
 * This is the default vault that reads secrets from environment variables.
 */

import type { VaultService } from '../types';

/**
 * Vault implementation that reads secrets from environment variables.
 * 
 * This is the default vault used when no custom vault is provided.
 * 
 * @example
 * ```typescript
 * const vault = new EnvVault();
 * const apiKey = await vault.getSecret('OPENAI_API_KEY');
 * ```
 */
export class EnvVault implements VaultService {
  /**
   * Get a secret from environment variables.
   * 
   * @param keyName - Environment variable name
   * @returns The environment variable value, or empty string if not set
   */
  async getSecret(keyName: string): Promise<string> {
    return process.env[keyName] ?? '';
  }

  /**
   * Check if an environment variable exists.
   * 
   * @param keyName - Environment variable name
   * @returns True if the environment variable is set (even if empty)
   */
  async hasSecret(keyName: string): Promise<boolean> {
    return keyName in process.env;
  }

  /**
   * List all environment variable names.
   * Note: This returns ALL environment variables, which may include
   * sensitive system variables. Use with caution.
   * 
   * @returns Array of environment variable names
   */
  async listSecrets(): Promise<string[]> {
    return Object.keys(process.env);
  }
}

/**
 * Create a new EnvVault instance.
 */
export function createEnvVault(): EnvVault {
  return new EnvVault();
}
