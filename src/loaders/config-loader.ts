import { readFileSync, existsSync } from 'fs';
import { parse as parseYaml } from 'yaml';
import Ajv from 'ajv';
import type {
  ModelsConfigFile,
  RolesConfigFile,
  ModelConfig,
  RoleConfig,
  SimpleRoleConfig,
  RoleWithFallback,
  RoleWithVariants,
} from '../types';
import { SilkboardError } from '../errors';

import modelsSchema from '../../config/models.schema.json';
import rolesSchema from '../../config/roles.schema.json';

// Disable strict format validation since we don't have ajv-formats installed
const ajv = new Ajv({ allErrors: true, strict: false });

const validateModels = ajv.compile(modelsSchema);
const validateRoles = ajv.compile(rolesSchema);

export class ConfigLoader {
  private modelsConfig: ModelsConfigFile | null = null;
  private rolesConfig: RolesConfigFile | null = null;
  private environment: string;

  constructor(environment: string = 'production') {
    this.environment = environment;
  }

  loadModelsConfig(configPathOrObject: string | ModelsConfigFile): ModelsConfigFile {
    let config: ModelsConfigFile;

    if (typeof configPathOrObject === 'string') {
      if (!existsSync(configPathOrObject)) {
        throw SilkboardError.configNotFound(configPathOrObject);
      }
      const content = readFileSync(configPathOrObject, 'utf-8');
      config = this.parseConfigFile(configPathOrObject, content) as ModelsConfigFile;
    } else {
      config = configPathOrObject;
    }

    if (!validateModels(config)) {
      const errors = validateModels.errors
        ?.map((e) => `${e.instancePath}: ${e.message}`)
        .join('\n');
      throw SilkboardError.configInvalid(errors);
    }

    this.modelsConfig = config;
    return config;
  }

  loadRolesConfig(configPathOrObject: string | RolesConfigFile): RolesConfigFile {
    let config: RolesConfigFile;

    if (typeof configPathOrObject === 'string') {
      if (!existsSync(configPathOrObject)) {
        throw SilkboardError.configNotFound(configPathOrObject);
      }
      const content = readFileSync(configPathOrObject, 'utf-8');
      config = this.parseConfigFile(configPathOrObject, content) as RolesConfigFile;
    } else {
      config = configPathOrObject;
    }

    if (!validateRoles(config)) {
      const errors = validateRoles.errors
        ?.map((e) => `${e.instancePath}: ${e.message}`)
        .join('\n');
      throw SilkboardError.configInvalid(errors);
    }

    this.rolesConfig = config;
    return config;
  }

  getModelsConfig(): ModelsConfigFile {
    if (!this.modelsConfig) {
      throw SilkboardError.configNotLoaded('models');
    }
    return this.modelsConfig;
  }

  getRolesConfig(): RolesConfigFile | null {
    return this.rolesConfig;
  }

  getModel(alias: string): ModelConfig {
    const config = this.getModelsConfig();
    const model = config.models[alias];
    if (!model) {
      throw SilkboardError.modelNotFound(alias);
    }
    return model;
  }

  getModelAliases(): string[] {
    return Object.keys(this.getModelsConfig().models);
  }

  getModelsByType(type: 'language' | 'embedding' | 'reranker'): Record<string, ModelConfig> {
    const config = this.getModelsConfig();
    return Object.fromEntries(
      Object.entries(config.models).filter(([_, model]) => model.type === type)
    );
  }

  resolveRole(roleName: string, variant?: string): { modelAlias: string; overrides?: SimpleRoleConfig['overrides'] } {
    if (!this.rolesConfig) {
      throw SilkboardError.configNotLoaded('roles');
    }

    let roleConfig = this.rolesConfig.roles[roleName];
    if (!roleConfig) {
      throw SilkboardError.roleNotFound(roleName);
    }

    // Apply environment overrides if present
    const envOverrides = this.rolesConfig.environments?.[this.environment]?.[roleName];
    if (envOverrides) {
      roleConfig = this.mergeRoleConfig(roleConfig, envOverrides);
    }

    // Handle different role config types
    if (this.isSimpleRole(roleConfig)) {
      return {
        modelAlias: roleConfig.model,
        overrides: roleConfig.overrides,
      };
    }

    if (this.isRoleWithFallback(roleConfig)) {
      return {
        modelAlias: roleConfig.primary,
        overrides: roleConfig.overrides,
      };
    }

    if (this.isRoleWithVariants(roleConfig)) {
      if (!variant) {
        throw SilkboardError.roleRequiresVariant(roleName);
      }
      const variantConfig = roleConfig[variant];
      if (!variantConfig) {
        throw SilkboardError.variantNotFound(roleName, variant);
      }
      return {
        modelAlias: variantConfig.model,
        overrides: variantConfig.overrides,
      };
    }

    throw SilkboardError.configInvalid(`Invalid role configuration for '${roleName}'`);
  }

  getRoleFallback(roleName: string): string | null {
    if (!this.rolesConfig) return null;
    
    const roleConfig = this.rolesConfig.roles[roleName];
    if (this.isRoleWithFallback(roleConfig)) {
      return roleConfig.fallback;
    }
    return null;
  }

  private isSimpleRole(config: RoleConfig): config is SimpleRoleConfig {
    return 'model' in config && typeof (config as SimpleRoleConfig).model === 'string';
  }

  private isRoleWithFallback(config: RoleConfig): config is RoleWithFallback {
    return 'primary' in config && 'fallback' in config;
  }

  private isRoleWithVariants(config: RoleConfig): config is RoleWithVariants {
    return !this.isSimpleRole(config) && !this.isRoleWithFallback(config);
  }

  /**
   * Parse config file content based on file extension.
   * Supports YAML (.yaml, .yml) and JSON (.json) files.
   */
  private parseConfigFile(filePath: string, content: string): unknown {
    const ext = filePath.toLowerCase().split('.').pop();
    
    if (ext === 'json') {
      try {
        return JSON.parse(content);
      } catch (error) {
        throw SilkboardError.configInvalid(
          `Failed to parse JSON config: ${(error as Error).message}`
        );
      }
    }
    
    // Default to YAML parsing for .yaml, .yml, or unknown extensions
    return parseYaml(content);
  }

  private mergeRoleConfig(
    base: RoleConfig,
    override: Partial<SimpleRoleConfig>
  ): RoleConfig {
    if (this.isSimpleRole(base)) {
      return {
        model: override.model ?? base.model,
        overrides: {
          ...base.overrides,
          ...override.overrides,
          reasoning: {
            ...base.overrides?.reasoning,
            ...override.overrides?.reasoning,
          },
          parameters: {
            ...base.overrides?.parameters,
            ...override.overrides?.parameters,
          },
        },
      };
    }
    // For complex role types, just return base (environment overrides only work on simple roles)
    return base;
  }
}

export function createConfigLoader(environment?: string): ConfigLoader {
  return new ConfigLoader(environment);
}
