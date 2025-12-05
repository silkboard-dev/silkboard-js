import { describe, it, expect, beforeEach } from 'vitest';
import { CostTracker } from '../../../src/cost/tracker';
import type { ModelConfig } from '../../../src/types';

describe('CostTracker', () => {
  describe('tiered pricing', () => {
    let tracker: CostTracker;

    beforeEach(() => {
      const modelConfigs: Record<string, ModelConfig> = {
        'claude-sonnet-4-5': {
          provider: 'anthropic',
          model_id: 'claude-sonnet-4-5-20250929',
          type: 'language',
          pricing: {
            input: 3.00,
            output: 15.00,
            cached: 0.30,
            // Tiered pricing: higher rates for prompts >200K tokens
            tiered: [
              { up_to: 200000, input: 3.00, output: 15.00, cached: 0.30 },
              { up_to: 'unlimited', input: 6.00, output: 22.50, cached: 0.60 },
            ],
          },
        },
        'gpt-4o': {
          provider: 'openai',
          model_id: 'gpt-4o',
          type: 'language',
          pricing: {
            input: 2.50,
            output: 10.00,
            cached: 1.25,
          },
        },
      };
      tracker = new CostTracker({ modelConfigs });
    });

    it('should use base tier pricing for small context', async () => {
      const record = await tracker.track({
        model: 'claude-sonnet-4-5',
        inputTokens: 50000, // 50K tokens - within first tier
        outputTokens: 1000,
        latencyMs: 500,
      });

      // Input: 50K tokens at $3/M = $0.15
      // Output: 1K tokens at $15/M = $0.015
      // Total: $0.165
      expect(record.cost).toBeCloseTo(0.165, 4);
    });

    it('should use higher tier pricing for large context', async () => {
      const record = await tracker.track({
        model: 'claude-sonnet-4-5',
        inputTokens: 300000, // 300K tokens - above 200K threshold
        outputTokens: 1000,
        latencyMs: 500,
      });

      // Input: 300K tokens at $6/M = $1.80
      // Output: 1K tokens at $22.50/M = $0.0225
      // Total: $1.8225
      expect(record.cost).toBeCloseTo(1.8225, 4);
    });

    it('should use exact threshold pricing at boundary', async () => {
      const record = await tracker.track({
        model: 'claude-sonnet-4-5',
        inputTokens: 200000, // Exactly 200K - should use first tier
        outputTokens: 1000,
        latencyMs: 500,
      });

      // Input: 200K tokens at $3/M = $0.60
      // Output: 1K tokens at $15/M = $0.015
      // Total: $0.615
      expect(record.cost).toBeCloseTo(0.615, 4);
    });

    it('should use non-tiered pricing for models without tiers', async () => {
      const record = await tracker.track({
        model: 'gpt-4o',
        inputTokens: 300000, // 300K tokens
        outputTokens: 1000,
        latencyMs: 500,
      });

      // Input: 300K tokens at $2.50/M = $0.75
      // Output: 1K tokens at $10/M = $0.01
      // Total: $0.76
      expect(record.cost).toBeCloseTo(0.76, 4);
    });

    it('should handle cached tokens with tiered pricing', async () => {
      const record = await tracker.track({
        model: 'claude-sonnet-4-5',
        inputTokens: 300000, // 300K total - above threshold
        cachedTokens: 100000, // 100K cached
        outputTokens: 1000,
        latencyMs: 500,
      });

      // Uncached input: 200K tokens at $6/M = $1.20
      // Cached: 100K tokens at $0.60/M = $0.06
      // Output: 1K tokens at $22.50/M = $0.0225
      // Total: $1.2825
      expect(record.cost).toBeCloseTo(1.2825, 4);
    });
  });

  describe('estimateCost', () => {
    let tracker: CostTracker;

    beforeEach(() => {
      const modelConfigs: Record<string, ModelConfig> = {
        'claude-sonnet-4-5': {
          provider: 'anthropic',
          model_id: 'claude-sonnet-4-5-20250929',
          type: 'language',
          pricing: {
            input: 3.00,
            output: 15.00,
            cached: 0.30,
            tiered: [
              { up_to: 200000, input: 3.00, output: 15.00, cached: 0.30 },
              { up_to: 'unlimited', input: 6.00, output: 22.50, cached: 0.60 },
            ],
          },
        },
      };
      tracker = new CostTracker({ modelConfigs });
    });

    it('should estimate cost before request', async () => {
      const cost = await tracker.estimateCost({
        model: 'claude-sonnet-4-5',
        inputTokens: 50000,
        outputTokens: 2000,
      });

      // Input: 50K at $3/M = $0.15
      // Output: 2K at $15/M = $0.03
      // Total: $0.18
      expect(cost).toBeCloseTo(0.18, 4);
    });

    it('should estimate cost with tiered pricing', async () => {
      const cost = await tracker.estimateCost({
        model: 'claude-sonnet-4-5',
        inputTokens: 300000,
        outputTokens: 2000,
      });

      // Input: 300K at $6/M = $1.80
      // Output: 2K at $22.50/M = $0.045
      // Total: $1.845
      expect(cost).toBeCloseTo(1.845, 4);
    });
  });
});
