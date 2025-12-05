/**
 * Registry Loader - loads provider metadata from YAML files.
 */

import { readFileSync, readdirSync, existsSync } from 'fs';
import { join, basename } from 'path';
import { parse as parseYaml } from 'yaml';
import type { ProviderMetadataFile } from '../types/registry';

/** Categories to scan for provider files */
const REGISTRY_CATEGORIES = ['official', 'third-party', 'cloud', 'gateways'] as const;

export interface LoaderOptions {
  /** Base path to registry directory */
  registryPath: string;
  /** Categories to load (default: all) */
  categories?: typeof REGISTRY_CATEGORIES[number][];
  /** Whether to validate against schema */
  validate?: boolean;
}

export interface LoadResult {
  providers: Map<string, ProviderMetadataFile>;
  errors: Array<{ file: string; error: string }>;
}

/**
 * Loads provider metadata from YAML files in the registry directory.
 */
export class RegistryLoader {
  private registryPath: string;
  private categories: readonly string[];

  constructor(options: LoaderOptions) {
    this.registryPath = options.registryPath;
    this.categories = options.categories ?? REGISTRY_CATEGORIES;
  }

  /**
   * Load all provider metadata files from the registry.
   */
  load(): LoadResult {
    const providers = new Map<string, ProviderMetadataFile>();
    const errors: Array<{ file: string; error: string }> = [];

    for (const category of this.categories) {
      const categoryPath = join(this.registryPath, category);
      
      if (!existsSync(categoryPath)) {
        continue;
      }

      const files = readdirSync(categoryPath).filter(f => f.endsWith('.yaml') || f.endsWith('.yml'));

      for (const file of files) {
        const filePath = join(categoryPath, file);
        
        try {
          const content = readFileSync(filePath, 'utf-8');
          const data = parseYaml(content) as ProviderMetadataFile;
          
          if (!data.provider?.id) {
            errors.push({ file: filePath, error: 'Missing provider.id' });
            continue;
          }

          providers.set(data.provider.id, data);
        } catch (error) {
          errors.push({ 
            file: filePath, 
            error: error instanceof Error ? error.message : String(error) 
          });
        }
      }
    }

    return { providers, errors };
  }

  /**
   * Load a single provider file by path.
   */
  loadFile(filePath: string): ProviderMetadataFile {
    const content = readFileSync(filePath, 'utf-8');
    return parseYaml(content) as ProviderMetadataFile;
  }

  /**
   * Load a provider by ID, searching all categories.
   */
  loadProvider(providerId: string): ProviderMetadataFile | null {
    for (const category of this.categories) {
      const categoryPath = join(this.registryPath, category);
      
      if (!existsSync(categoryPath)) {
        continue;
      }

      // Try both .yaml and .yml extensions
      for (const ext of ['.yaml', '.yml']) {
        const filePath = join(categoryPath, `${providerId}${ext}`);
        if (existsSync(filePath)) {
          return this.loadFile(filePath);
        }
      }
    }

    return null;
  }

  /**
   * List all available provider IDs.
   */
  listProviders(): string[] {
    const providers: string[] = [];

    for (const category of this.categories) {
      const categoryPath = join(this.registryPath, category);
      
      if (!existsSync(categoryPath)) {
        continue;
      }

      const files = readdirSync(categoryPath).filter(f => f.endsWith('.yaml') || f.endsWith('.yml'));
      
      for (const file of files) {
        const providerId = basename(file, file.endsWith('.yaml') ? '.yaml' : '.yml');
        providers.push(providerId);
      }
    }

    return providers;
  }
}

/**
 * Create a registry loader with default options.
 */
export function createLoader(registryPath: string): RegistryLoader {
  return new RegistryLoader({ registryPath });
}
