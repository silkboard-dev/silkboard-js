import { describe, it, expect, beforeEach } from 'vitest';
import { resolve } from 'path';
import { ConfigLoader } from '../../../src/loaders';
import type { ModelsConfigFile, RolesConfigFile } from '../../../src/types';

const FIXTURES_DIR = resolve(__dirname, '../../fixtures/configs');

describe('ConfigLoader', () => {
  let loader: ConfigLoader;

  beforeEach(() => {
    loader = new ConfigLoader();
  });

  describe('loadModelsConfig', () => {
    describe('with YAML file path', () => {
      it('should load models from YAML file', () => {
        const config = loader.loadModelsConfig(resolve(FIXTURES_DIR, 'models.yaml'));

        expect(config.version).toBe('1.0');
        expect(config.models['gpt-4o']).toBeDefined();
        expect(config.models['gpt-4o'].provider).toBe('openai');
      });

      it('should throw when file not found', () => {
        expect(() => loader.loadModelsConfig('/nonexistent/path.yaml')).toThrow();
      });
    });

    describe('with JSON file path', () => {
      it('should load models from JSON file', () => {
        const config = loader.loadModelsConfig(resolve(FIXTURES_DIR, 'models.json'));

        expect(config.version).toBe('1.0');
        expect(config.models['gpt-4o']).toBeDefined();
        expect(config.models['gpt-4o'].provider).toBe('openai');
        expect(config.models['claude-sonnet']).toBeDefined();
      });
    });

    describe('with inline object', () => {
      it('should accept inline config object', () => {
        const inlineConfig: ModelsConfigFile = {
          version: '1.0',
          models: {
            'test-model': {
              provider: 'openai',
              model_id: 'gpt-4o-mini',
              type: 'language',
              pricing: {
                input: 0.15,
                output: 0.60,
              },
            },
          },
        };

        const config = loader.loadModelsConfig(inlineConfig);

        expect(config.version).toBe('1.0');
        expect(config.models['test-model']).toBeDefined();
        expect(config.models['test-model'].model_id).toBe('gpt-4o-mini');
      });

      it('should validate inline config against schema', () => {
        const invalidConfig = {
          version: '1.0',
          models: {
            'test-model': {
              // Missing required fields: provider, model_id, type, pricing
            },
          },
        } as unknown as ModelsConfigFile;

        expect(() => loader.loadModelsConfig(invalidConfig)).toThrow();
      });
    });
  });

  describe('loadRolesConfig', () => {
    beforeEach(() => {
      // Load models first (required for role resolution)
      loader.loadModelsConfig(resolve(FIXTURES_DIR, 'models.yaml'));
    });

    describe('with YAML file path', () => {
      it('should load roles from YAML file', () => {
        const config = loader.loadRolesConfig(resolve(FIXTURES_DIR, 'roles.yaml'));

        expect(config.version).toBe('1.0');
        expect(config.roles).toBeDefined();
      });
    });

    describe('with inline object', () => {
      it('should accept inline config object', () => {
        const inlineConfig: RolesConfigFile = {
          version: '1.0',
          roles: {
            answer: {
              model: 'gpt-4o',
            },
          },
        };

        const config = loader.loadRolesConfig(inlineConfig);

        expect(config.version).toBe('1.0');
        expect(config.roles['answer']).toBeDefined();
      });

      it('should support role with variants', () => {
        const inlineConfig: RolesConfigFile = {
          version: '1.0',
          roles: {
            answer: {
              fast: { model: 'gpt-4o' },
              deep: { model: 'claude-sonnet' },
            },
          },
        };

        const config = loader.loadRolesConfig(inlineConfig);
        const resolved = loader.resolveRole('answer', 'fast');

        expect(resolved.modelAlias).toBe('gpt-4o');
      });

      it('should support role with fallback', () => {
        const inlineConfig: RolesConfigFile = {
          version: '1.0',
          roles: {
            answer: {
              primary: 'gpt-4o',
              fallback: 'claude-sonnet',
            },
          },
        };

        const config = loader.loadRolesConfig(inlineConfig);
        const fallback = loader.getRoleFallback('answer');

        expect(fallback).toBe('claude-sonnet');
      });
    });
  });

  describe('getModel', () => {
    it('should return model config by alias', () => {
      loader.loadModelsConfig(resolve(FIXTURES_DIR, 'models.yaml'));

      const model = loader.getModel('gpt-4o');

      expect(model.provider).toBe('openai');
      expect(model.model_id).toBe('gpt-4o');
    });

    it('should throw when model not found', () => {
      loader.loadModelsConfig(resolve(FIXTURES_DIR, 'models.yaml'));

      expect(() => loader.getModel('nonexistent')).toThrow();
    });
  });

  describe('getModelsByType', () => {
    it('should filter models by type', () => {
      loader.loadModelsConfig(resolve(FIXTURES_DIR, 'models.yaml'));

      const languageModels = loader.getModelsByType('language');
      const embeddingModels = loader.getModelsByType('embedding');

      expect(Object.keys(languageModels)).toContain('gpt-4o');
      expect(Object.keys(embeddingModels)).toContain('text-embedding-3-large');
    });
  });
});
