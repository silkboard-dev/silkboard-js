import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Router, StrategyRouter } from '../../../src/router';
import type {
  RoutingConfig,
  StrategyRoutingConfig,
  ConditionalRoutingConfig,
} from '../../../src/types';

describe('Router', () => {
  describe('mode: none', () => {
    let router: Router;

    beforeEach(() => {
      router = new Router({
        config: { mode: 'none' },
      });
    });

    it('should return direct model when specified', () => {
      const result = router.route({
        requestId: 'req-1',
        model: 'gpt-4o',
      });

      expect(result.model).toBe('gpt-4o');
      expect(result.reason).toBe('direct');
      expect(result.attempt).toBe(1);
    });

    it('should throw when no model specified', () => {
      expect(() => router.route({ requestId: 'req-1' })).toThrow(
        'Routing mode is "none" but no model specified'
      );
    });
  });

  describe('mode: role-based', () => {
    let router: Router;
    const roleResolver = vi.fn();

    beforeEach(() => {
      roleResolver.mockReset();
      router = new Router({
        config: { mode: 'role-based', defaultModel: 'gpt-4o-mini' },
        roleResolver,
      });
    });

    it('should return direct model when specified', () => {
      const result = router.route({
        requestId: 'req-1',
        model: 'claude-sonnet-4',
      });

      expect(result.model).toBe('claude-sonnet-4');
      expect(result.reason).toBe('direct');
      expect(roleResolver).not.toHaveBeenCalled();
    });

    it('should use role resolver when role specified', () => {
      roleResolver.mockReturnValue('gpt-4o');

      const result = router.route({
        requestId: 'req-1',
        role: 'answer',
        variant: 'fast',
      });

      expect(result.model).toBe('gpt-4o');
      expect(result.reason).toBe('role');
      expect(roleResolver).toHaveBeenCalledWith('answer', 'fast');
    });

    it('should use default model when no model or role', () => {
      const result = router.route({ requestId: 'req-1' });

      expect(result.model).toBe('gpt-4o-mini');
      expect(result.reason).toBe('default');
    });

    it('should throw when no model, role, or default', () => {
      const routerNoDefault = new Router({
        config: { mode: 'role-based' },
        roleResolver,
      });

      expect(() => routerNoDefault.route({ requestId: 'req-1' })).toThrow(
        'No model, role, or default model specified'
      );
    });
  });

  describe('mode: strategy', () => {
    let router: Router;
    const config: StrategyRoutingConfig = {
      mode: 'strategy',
      strategy: 'simple-shuffle',
      deployments: [
        { model: 'gpt-4o', weight: 1 },
        { model: 'claude-sonnet-4', weight: 1 },
        { model: 'gemini-pro', weight: 1, enabled: false },
      ],
      fallbacks: [
        { from: 'gpt-4o', to: ['claude-sonnet-4', 'gemini-pro'] },
      ],
      cooldown: {
        failureThreshold: 3,
        cooldownSeconds: 60,
      },
    };

    beforeEach(() => {
      router = new Router({ config });
      router.resetHealth();
    });

    it('should return direct model when specified', () => {
      const result = router.route({
        requestId: 'req-1',
        model: 'custom-model',
      });

      expect(result.model).toBe('custom-model');
      expect(result.reason).toBe('direct');
    });

    it('should select from enabled deployments', () => {
      const result = router.route({ requestId: 'req-1' });

      expect(result.reason).toBe('strategy');
      expect(['gpt-4o', 'claude-sonnet-4']).toContain(result.model);
      // gemini-pro should not be selected (disabled)
      expect(result.model).not.toBe('gemini-pro');
    });

    it('should track health on success', () => {
      router.recordSuccess('gpt-4o', 100);

      const health = router.getHealth();
      const gpt4Health = health.get('gpt-4o');

      expect(gpt4Health?.healthy).toBe(true);
      expect(gpt4Health?.consecutiveFailures).toBe(0);
      expect(gpt4Health?.requestCount).toBe(1);
      expect(gpt4Health?.averageLatencyMs).toBe(100);
    });

    it('should track health on failure', () => {
      const error = new Error('Rate limit exceeded');
      router.recordFailure('gpt-4o', error);

      const health = router.getHealth();
      const gpt4Health = health.get('gpt-4o');

      expect(gpt4Health?.healthy).toBe(true); // Not in cooldown yet
      expect(gpt4Health?.consecutiveFailures).toBe(1);
      expect(gpt4Health?.lastError).toBe(error);
    });

    it('should enter cooldown after threshold failures', () => {
      const error = new Error('Service unavailable');

      // Record 3 failures (threshold)
      router.recordFailure('gpt-4o', error);
      router.recordFailure('gpt-4o', error);
      router.recordFailure('gpt-4o', error);

      const health = router.getHealth();
      const gpt4Health = health.get('gpt-4o');

      expect(gpt4Health?.healthy).toBe(false);
      expect(gpt4Health?.consecutiveFailures).toBe(3);
    });

    it('should get fallback for failed model', () => {
      const fallback = router.getFallback('gpt-4o');
      expect(fallback).toBe('claude-sonnet-4');
    });

    it('should return null for model without fallback', () => {
      const fallback = router.getFallback('unknown-model');
      expect(fallback).toBeNull();
    });
  });

  describe('mode: conditional', () => {
    let router: Router;
    const config: ConditionalRoutingConfig = {
      mode: 'conditional',
      conditions: [
        {
          when: { 'user.tier': 'premium' },
          then: { model: 'gpt-4o' },
        },
        {
          when: { 'user.tier': 'free' },
          then: { model: 'gpt-4o-mini' },
        },
      ],
      default: { model: 'gpt-4o-mini' },
    };

    beforeEach(() => {
      router = new Router({ config });
    });

    it('should return direct model when specified', () => {
      const result = router.route({
        requestId: 'req-1',
        model: 'claude-sonnet-4',
        metadata: { user: { tier: 'premium' } },
      });

      expect(result.model).toBe('claude-sonnet-4');
      expect(result.reason).toBe('direct');
    });

    it('should match first condition', () => {
      const result = router.route({
        requestId: 'req-1',
        metadata: { user: { tier: 'premium' } },
      });

      expect(result.model).toBe('gpt-4o');
      expect(result.reason).toBe('condition');
    });

    it('should match second condition', () => {
      const result = router.route({
        requestId: 'req-1',
        metadata: { user: { tier: 'free' } },
      });

      expect(result.model).toBe('gpt-4o-mini');
      expect(result.reason).toBe('condition');
    });

    it('should use default when no condition matches', () => {
      const result = router.route({
        requestId: 'req-1',
        metadata: { user: { tier: 'enterprise' } },
      });

      expect(result.model).toBe('gpt-4o-mini');
      expect(result.reason).toBe('default');
    });

    it('should use default when no metadata', () => {
      const result = router.route({ requestId: 'req-1' });

      expect(result.model).toBe('gpt-4o-mini');
      expect(result.reason).toBe('default');
    });
  });

  describe('retry configuration', () => {
    it('should calculate retry delay with exponential backoff', () => {
      const router = new Router({
        config: {
          mode: 'strategy',
          strategy: 'simple-shuffle',
          deployments: [{ model: 'gpt-4o' }],
          retry: {
            initialDelayMs: 1000,
            maxDelayMs: 30000,
            backoffMultiplier: 2,
          },
        },
      });

      const delay1 = router.calculateRetryDelay(1);
      const delay2 = router.calculateRetryDelay(2);
      const delay3 = router.calculateRetryDelay(3);

      // Allow for jitter (±10%)
      expect(delay1).toBeGreaterThanOrEqual(900);
      expect(delay1).toBeLessThanOrEqual(1100);

      expect(delay2).toBeGreaterThanOrEqual(1800);
      expect(delay2).toBeLessThanOrEqual(2200);

      expect(delay3).toBeGreaterThanOrEqual(3600);
      expect(delay3).toBeLessThanOrEqual(4400);
    });

    it('should cap delay at maxDelayMs', () => {
      const router = new Router({
        config: {
          mode: 'strategy',
          strategy: 'simple-shuffle',
          deployments: [{ model: 'gpt-4o' }],
          retry: {
            initialDelayMs: 1000,
            maxDelayMs: 5000,
            backoffMultiplier: 2,
          },
        },
      });

      const delay10 = router.calculateRetryDelay(10);
      expect(delay10).toBeLessThanOrEqual(5500); // maxDelay + jitter
    });

    it('should identify retryable errors', () => {
      const router = new Router({
        config: {
          mode: 'strategy',
          strategy: 'simple-shuffle',
          deployments: [{ model: 'gpt-4o' }],
        },
      });

      expect(router.isRetryableError(new Error('RATE_LIMIT exceeded'))).toBe(true);
      expect(router.isRetryableError(new Error('Status 429'))).toBe(true);
      expect(router.isRetryableError(new Error('Status 503'))).toBe(true);
      expect(router.isRetryableError(new Error('Invalid request'))).toBe(false);
    });
  });
});

describe('StrategyRouter', () => {
  let strategyRouter: StrategyRouter;
  const deployments = [
    { model: 'gpt-4o', weight: 2 },
    { model: 'claude-sonnet-4', weight: 1 },
    { model: 'gemini-pro', weight: 1 },
  ];

  beforeEach(() => {
    strategyRouter = new StrategyRouter();
  });

  describe('simple-shuffle', () => {
    it('should select from available deployments', () => {
      const health = new Map();
      const strategy = strategyRouter.getStrategy('simple-shuffle');

      const selected = strategy(deployments, health);
      expect(selected).not.toBeNull();
      expect(['gpt-4o', 'claude-sonnet-4', 'gemini-pro']).toContain(selected?.model);
    });

    it('should respect weights over many selections', () => {
      const health = new Map();
      const strategy = strategyRouter.getStrategy('simple-shuffle');

      const counts: Record<string, number> = { 'gpt-4o': 0, 'claude-sonnet-4': 0, 'gemini-pro': 0 };
      for (let i = 0; i < 1000; i++) {
        const selected = strategy(deployments, health);
        if (selected) counts[selected.model]++;
      }

      // gpt-4o has weight 2, others have weight 1
      // Expected ratio: gpt-4o ~50%, others ~25% each
      expect(counts['gpt-4o']).toBeGreaterThan(400);
      expect(counts['claude-sonnet-4']).toBeGreaterThan(150);
      expect(counts['gemini-pro']).toBeGreaterThan(150);
    });

    it('should skip unhealthy deployments', () => {
      const health = new Map();
      health.set('gpt-4o', { model: 'gpt-4o', healthy: false, consecutiveFailures: 3, requestCount: 10 });

      const strategy = strategyRouter.getStrategy('simple-shuffle');
      const counts: Record<string, number> = { 'gpt-4o': 0, 'claude-sonnet-4': 0, 'gemini-pro': 0 };

      for (let i = 0; i < 100; i++) {
        const selected = strategy(deployments, health);
        if (selected) counts[selected.model]++;
      }

      expect(counts['gpt-4o']).toBe(0);
      expect(counts['claude-sonnet-4']).toBeGreaterThan(0);
      expect(counts['gemini-pro']).toBeGreaterThan(0);
    });
  });

  describe('round-robin', () => {
    it('should rotate through deployments', () => {
      const health = new Map();
      const strategy = strategyRouter.getStrategy('round-robin');
      strategyRouter.resetRoundRobin();

      const results: string[] = [];
      for (let i = 0; i < 6; i++) {
        const selected = strategy(deployments, health);
        if (selected) results.push(selected.model);
      }

      // Should cycle through all 3 deployments twice
      expect(results.length).toBe(6);
      expect(results[0]).toBe(results[3]);
      expect(results[1]).toBe(results[4]);
      expect(results[2]).toBe(results[5]);
    });
  });

  describe('lowest-latency', () => {
    it('should select deployment with lowest latency', () => {
      const health = new Map();
      health.set('gpt-4o', { model: 'gpt-4o', healthy: true, consecutiveFailures: 0, requestCount: 10, averageLatencyMs: 500 });
      health.set('claude-sonnet-4', { model: 'claude-sonnet-4', healthy: true, consecutiveFailures: 0, requestCount: 10, averageLatencyMs: 200 });
      health.set('gemini-pro', { model: 'gemini-pro', healthy: true, consecutiveFailures: 0, requestCount: 10, averageLatencyMs: 300 });

      const strategy = strategyRouter.getStrategy('lowest-latency');
      const selected = strategy(deployments, health);

      expect(selected?.model).toBe('claude-sonnet-4');
    });

    it('should handle deployments without latency data', () => {
      const health = new Map();
      health.set('gpt-4o', { model: 'gpt-4o', healthy: true, consecutiveFailures: 0, requestCount: 10, averageLatencyMs: 500 });
      // claude-sonnet-4 and gemini-pro have no latency data

      const strategy = strategyRouter.getStrategy('lowest-latency');
      const selected = strategy(deployments, health);

      // gpt-4o should be selected as it has known latency
      expect(selected?.model).toBe('gpt-4o');
    });
  });

  describe('least-busy', () => {
    it('should select deployment with lowest request count', () => {
      const health = new Map();
      health.set('gpt-4o', { model: 'gpt-4o', healthy: true, consecutiveFailures: 0, requestCount: 100 });
      health.set('claude-sonnet-4', { model: 'claude-sonnet-4', healthy: true, consecutiveFailures: 0, requestCount: 50 });
      health.set('gemini-pro', { model: 'gemini-pro', healthy: true, consecutiveFailures: 0, requestCount: 75 });

      const strategy = strategyRouter.getStrategy('least-busy');
      const selected = strategy(deployments, health);

      expect(selected?.model).toBe('claude-sonnet-4');
    });
  });
});
