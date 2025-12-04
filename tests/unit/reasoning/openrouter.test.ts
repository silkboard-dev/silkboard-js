/**
 * Unit tests for OpenRouter reasoning configuration builder
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { buildOpenRouterExtraBody } from '../../../src/reasoning/openrouter';

describe('OpenRouter Reasoning', () => {
  describe('buildOpenRouterExtraBody', () => {
    const createConfig = (overrides: any = {}) => ({
      provider: 'openrouter' as const,
      model_id: 'test-model',
      type: 'language' as const,
      pricing: {
        input: 1.0,
        output: 2.0,
      },
      ...overrides,
    });

    beforeEach(() => {
      vi.spyOn(console, 'warn').mockImplementation(() => {});
    });

    afterEach(() => {
      vi.restoreAllMocks();
    });

    it('should return empty body when no reasoning config provided', () => {
      const config = createConfig();
      
      const result = buildOpenRouterExtraBody(config);
      
      expect(result).toEqual({});
    });

    it('should return empty body when reasoning style is none', () => {
      const config = createConfig({
        reasoning: {
          style: 'none' as const,
        },
      });
      
      const result = buildOpenRouterExtraBody(config);
      
      expect(result).toEqual({});
    });

    it('should include provider routing when specified', () => {
      const config = createConfig({
        routing: {
          only: ['anthropic', 'openai'],
          order: ['anthropic', 'openai'],
        },
      });
      
      const result = buildOpenRouterExtraBody(config);
      
      expect(result).toEqual({
        provider: {
          only: ['anthropic', 'openai'],
          order: ['anthropic', 'openai'],
        },
      });
    });

    describe('Effort-based reasoning', () => {
      const effortConfig = {
        reasoning: {
          style: 'effort' as const,
          default: 'medium' as const,
        },
      };

      it('should use default effort when no override provided', () => {
        const config = createConfig(effortConfig);
        
        const result = buildOpenRouterExtraBody(config);
        
        expect(result).toEqual({
          reasoning: {
            effort: 'medium',
          },
        });
      });

      it('should use override effort when provided', () => {
        const config = createConfig(effortConfig);
        
        const result = buildOpenRouterExtraBody(config, { effort: 'high' });
        
        expect(result).toEqual({
          reasoning: {
            effort: 'high',
          },
        });
      });
    });

    describe('Budget-based reasoning', () => {
      const budgetConfig = {
        reasoning: {
          style: 'budget' as const,
          min: 1024,
          max: 200000,
          default: 8000,
          can_disable: true,
        },
      };

      it('should use default budget when no override provided', () => {
        const config = createConfig(budgetConfig);
        
        const result = buildOpenRouterExtraBody(config);
        
        expect(result).toEqual({
          reasoning: {
            max_tokens: 8000,
          },
        });
      });

      it('should use override budget when provided', () => {
        const config = createConfig(budgetConfig);
        
        const result = buildOpenRouterExtraBody(config, { budget: 16000 });
        
        expect(result).toEqual({
          reasoning: {
            max_tokens: 16000,
          },
        });
      });

      it('should clamp budget to OpenRouter max of 32000', () => {
        const config = createConfig(budgetConfig);
        
        const result = buildOpenRouterExtraBody(config, { budget: 50000 });
        
        expect(result).toEqual({
          reasoning: {
            max_tokens: 32000,
          },
        });
        
        expect(console.warn).toHaveBeenCalledWith(
          '[Silkboard] OpenRouter reasoning budget clamped from 50000 to 32000 (OpenRouter max: 32000)'
        );
      });

      it('should clamp budget to minimum when below min', () => {
        const config = createConfig(budgetConfig);
        
        const result = buildOpenRouterExtraBody(config, { budget: 512 });
        
        expect(result).toEqual({
          reasoning: {
            max_tokens: 1024,
          },
        });
        
        expect(console.warn).toHaveBeenCalledWith(
          '[Silkboard] OpenRouter reasoning budget clamped from 512 to 1024 (OpenRouter max: 32000)'
        );
      });

      it('should disable reasoning when budget is 0 and can_disable is true', () => {
        const config = createConfig(budgetConfig);
        
        const result = buildOpenRouterExtraBody(config, { budget: 0 });
        
        expect(result).toEqual({
          reasoning: {
            enabled: false,
          },
        });
      });

      it('should not warn when budget is 0 (disabled)', () => {
        const config = createConfig(budgetConfig);
        
        buildOpenRouterExtraBody(config, { budget: 0 });
        
        expect(console.warn).not.toHaveBeenCalled();
      });
    });

    describe('Toggle-based reasoning', () => {
      const toggleConfig = {
        reasoning: {
          style: 'toggle' as const,
          default: true,
        },
      };

      it('should use default enabled when no override provided', () => {
        const config = createConfig(toggleConfig);
        
        const result = buildOpenRouterExtraBody(config);
        
        expect(result).toEqual({
          reasoning: {
            enabled: true,
          },
        });
      });

      it('should use override enabled when provided', () => {
        const config = createConfig(toggleConfig);
        
        const result = buildOpenRouterExtraBody(config, { enabled: false });
        
        expect(result).toEqual({
          reasoning: {
            enabled: false,
          },
        });
      });
    });

    it('should combine provider routing with reasoning config', () => {
      const config = createConfig({
        routing: {
          only: ['anthropic'],
        },
        reasoning: {
          style: 'effort' as const,
          default: 'high' as const,
        },
      });
      
      const result = buildOpenRouterExtraBody(config);
      
      expect(result).toEqual({
        provider: {
          only: ['anthropic'],
        },
        reasoning: {
          effort: 'high',
        },
      });
    });
  });
});
