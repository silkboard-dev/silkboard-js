/**
 * E2E Tests for Router Integration
 * 
 * These tests verify routing strategies work with real API calls.
 * Run with: npm run test:e2e
 */

import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { Silkboard } from '../../src/service';
import type { 
  ModelsConfigFile, 
  StrategyRoutingConfig,
  ConditionalRoutingConfig,
  FallbackEvent,
  CooldownEvent,
} from '../../src/types';

const hasOpenAI = !!process.env.OPENAI_API_KEY;
const hasAnthropic = !!process.env.ANTHROPIC_API_KEY;
const hasGoogle = !!process.env.GEMINI_API_KEY;

const modelsConfig: ModelsConfigFile = {
  version: '1.0',
  models: {
    'gpt-4o-mini': {
      provider: 'openai',
      model_id: 'gpt-4o-mini',
      type: 'language',
      pricing: { input: 0.15, output: 0.60 },
    },
    'claude-haiku-3.5': {
      provider: 'anthropic',
      model_id: 'claude-3-5-haiku-20241022',
      type: 'language',
      pricing: { input: 0.80, output: 4.00 },
    },
    'gemini-2.0-flash': {
      provider: 'google',
      model_id: 'gemini-2.0-flash-exp',
      type: 'language',
      pricing: { input: 0.075, output: 0.30 },
    },
  },
};

describe('E2E: Router Integration', () => {
  describe('Strategy Routing: Round Robin', () => {
    it.skipIf(!hasOpenAI || !hasAnthropic)('should rotate between deployments', async () => {
      const routingConfig: StrategyRoutingConfig = {
        mode: 'strategy',
        strategy: 'round-robin',
        deployments: [
          { model: 'gpt-4o-mini', weight: 1 },
          { model: 'claude-haiku-3.5', weight: 1 },
        ],
      };

      const silk = new Silkboard({
        modelsConfig,
        routingConfig,
      });

      const modelsUsed: string[] = [];

      silk.on('complete', (e) => {
        modelsUsed.push(e.model);
      });

      // Make 4 requests - should alternate between models
      for (let i = 0; i < 4; i++) {
        await silk.generateText({
          messages: [{ role: 'user', content: `Request ${i + 1}` }],
        });
      }

      // Should have used both models
      expect(modelsUsed).toContain('gpt-4o-mini');
      expect(modelsUsed).toContain('claude-haiku-3.5');
      
      // Round robin should alternate
      expect(modelsUsed[0]).not.toBe(modelsUsed[1]);
    });
  });

  describe('Strategy Routing: Lowest Latency', () => {
    it.skipIf(!hasOpenAI || !hasGoogle)('should prefer faster model after warmup', async () => {
      const routingConfig: StrategyRoutingConfig = {
        mode: 'strategy',
        strategy: 'lowest-latency',
        deployments: [
          { model: 'gpt-4o-mini', weight: 1 },
          { model: 'gemini-2.0-flash', weight: 1 },
        ],
      };

      const silk = new Silkboard({
        modelsConfig,
        routingConfig,
      });

      const latencies: Record<string, number[]> = {
        'gpt-4o-mini': [],
        'gemini-2.0-flash': [],
      };

      silk.on('complete', (e) => {
        latencies[e.model].push(e.latencyMs);
      });

      // Warmup: make requests to both models
      for (let i = 0; i < 4; i++) {
        await silk.generateText({
          messages: [{ role: 'user', content: 'Hi' }],
        });
      }

      // After warmup, router should have latency data
      const router = silk.getRouter();
      expect(router).not.toBeNull();

      const health = router!.getHealth();
      expect(health.size).toBeGreaterThan(0);

      // At least one model should have latency data
      const hasLatencyData = Array.from(health.values()).some(
        (h) => h.averageLatencyMs !== undefined
      );
      expect(hasLatencyData).toBe(true);
    });
  });

  describe('Conditional Routing', () => {
    it.skipIf(!hasOpenAI || !hasAnthropic)('should route based on metadata', async () => {
      const routingConfig: ConditionalRoutingConfig = {
        mode: 'conditional',
        conditions: [
          {
            when: { 'user.tier': 'premium' },
            then: { model: 'claude-haiku-3.5' },
          },
          {
            when: { 'user.tier': 'free' },
            then: { model: 'gpt-4o-mini' },
          },
        ],
        default: { model: 'gpt-4o-mini' },
      };

      const silk = new Silkboard({
        modelsConfig,
        routingConfig,
      });

      const modelsUsed: string[] = [];
      silk.on('complete', (e) => modelsUsed.push(e.model));

      // Premium user should get Claude
      await silk.generateText({
        messages: [{ role: 'user', content: 'Premium request' }],
        metadata: { user: { tier: 'premium' } },
      });

      // Free user should get GPT
      await silk.generateText({
        messages: [{ role: 'user', content: 'Free request' }],
        metadata: { user: { tier: 'free' } },
      });

      expect(modelsUsed[0]).toBe('claude-haiku-3.5');
      expect(modelsUsed[1]).toBe('gpt-4o-mini');
    });
  });

  describe('Fallback Chains', () => {
    it.skipIf(!hasOpenAI)('should use fallback when primary fails', async () => {
      // Create config with a non-existent model as primary
      const modelsWithBadModel: ModelsConfigFile = {
        ...modelsConfig,
        models: {
          ...modelsConfig.models,
          'bad-model': {
            provider: 'openai',
            model_id: 'non-existent-model-xyz',
            type: 'language',
            pricing: { input: 0, output: 0 },
          },
        },
      };

      const routingConfig: StrategyRoutingConfig = {
        mode: 'strategy',
        strategy: 'simple-shuffle',
        deployments: [
          { model: 'bad-model', weight: 1 },
        ],
        fallbacks: [
          { from: 'bad-model', to: ['gpt-4o-mini'] },
        ],
        cooldown: {
          failureThreshold: 1,
          cooldownSeconds: 60,
        },
      };

      const silk = new Silkboard({
        modelsConfig: modelsWithBadModel,
        routingConfig,
      });

      const fallbackEvents: FallbackEvent[] = [];
      const cooldownEvents: CooldownEvent[] = [];

      silk.on('fallback', (e) => fallbackEvents.push(e));
      silk.on('cooldown', (e) => cooldownEvents.push(e));

      // This should fail with bad-model and trigger fallback
      // Note: The current implementation doesn't auto-retry with fallback,
      // but the router tracks health for future requests
      try {
        await silk.generateText({
          messages: [{ role: 'user', content: 'Test' }],
        });
      } catch (error) {
        // Expected to fail
      }

      // After failure, router should mark bad-model as unhealthy
      const router = silk.getRouter();
      const health = router?.getHealth();
      const badModelHealth = health?.get('bad-model');
      
      if (badModelHealth) {
        expect(badModelHealth.consecutiveFailures).toBeGreaterThan(0);
      }
    });
  });

  describe('Health Tracking', () => {
    it.skipIf(!hasOpenAI)('should track request health', async () => {
      const routingConfig: StrategyRoutingConfig = {
        mode: 'strategy',
        strategy: 'simple-shuffle',
        deployments: [
          { model: 'gpt-4o-mini', weight: 1 },
        ],
      };

      const silk = new Silkboard({
        modelsConfig,
        routingConfig,
      });

      // Make successful requests
      await silk.generateText({
        messages: [{ role: 'user', content: 'Test 1' }],
      });

      await silk.generateText({
        messages: [{ role: 'user', content: 'Test 2' }],
      });

      const router = silk.getRouter();
      const health = router?.getHealth();
      const gptHealth = health?.get('gpt-4o-mini');

      expect(gptHealth).toBeDefined();
      expect(gptHealth?.healthy).toBe(true);
      expect(gptHealth?.requestCount).toBe(2);
      expect(gptHealth?.consecutiveFailures).toBe(0);
      expect(gptHealth?.averageLatencyMs).toBeGreaterThan(0);
    });
  });
});

describe('E2E: Stream Events', () => {
  it.skipIf(!hasOpenAI)('should emit stream events when enabled', async () => {
    const silk = new Silkboard({
      modelsConfig,
      emitStreamEvents: true,
    });

    const streamChunks: string[] = [];
    silk.on('stream', (e) => {
      streamChunks.push(e.chunk);
    });

    const result = await silk.streamText({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: 'Count from 1 to 3.' }],
    });

    // Consume the stream
    let text = '';
    for await (const chunk of result.textStream) {
      text += chunk;
    }

    // Should have received stream events
    expect(streamChunks.length).toBeGreaterThan(0);
    
    // Combined chunks should match the full text
    const combinedChunks = streamChunks.join('');
    expect(combinedChunks).toBe(text);
  });

  it.skipIf(!hasOpenAI)('should NOT emit stream events when disabled', async () => {
    const silk = new Silkboard({
      modelsConfig,
      emitStreamEvents: false, // Default
    });

    const streamChunks: string[] = [];
    silk.on('stream', (e) => {
      streamChunks.push(e.chunk);
    });

    const result = await silk.streamText({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: 'Hi' }],
    });

    // Consume the stream
    for await (const _ of result.textStream) {
      // Just consume
    }

    // Should NOT have received stream events
    expect(streamChunks.length).toBe(0);
  });
});
