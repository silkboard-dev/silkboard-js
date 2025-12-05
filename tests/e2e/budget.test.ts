/**
 * E2E Tests for Budget Management
 * 
 * These tests verify budget tracking works with real API calls.
 * Run with: npm run test:e2e
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { Silkboard } from '../../src/service';
import { BudgetManager, MemoryBudgetStore } from '../../src/budget';
import { SilkboardEventEmitter } from '../../src/events';
import type { ModelsConfigFile, BudgetAlertEvent } from '../../src/types';

const hasOpenAI = !!process.env.OPENAI_API_KEY;

const modelsConfig: ModelsConfigFile = {
  version: '1.0',
  models: {
    'gpt-4o-mini': {
      provider: 'openai',
      model_id: 'gpt-4o-mini',
      type: 'language',
      pricing: { input: 0.15, output: 0.60 },
    },
  },
};

describe('E2E: Budget Management', () => {
  let silk: Silkboard;
  let budgetManager: BudgetManager;

  beforeEach(() => {
    silk = new Silkboard({ modelsConfig });
    budgetManager = new BudgetManager();
  });

  describe('Cost Estimation', () => {
    it('should estimate cost before request', async () => {
      const estimate = await silk.estimateCost({
        model: 'gpt-4o-mini',
        inputTokens: 1000,
        outputTokens: 500,
      });

      // gpt-4o-mini: $0.15/1M input + $0.60/1M output
      // (1000/1M * 0.15) + (500/1M * 0.60) = 0.00015 + 0.0003 = 0.00045
      expect(estimate).toBeCloseTo(0.00045, 5);
    });

    it('should estimate cost with cached tokens', async () => {
      const estimate = await silk.estimateCost({
        model: 'gpt-4o-mini',
        inputTokens: 1000,
        outputTokens: 500,
        cachedTokens: 500, // Half of input is cached
      });

      // Uncached: 500 tokens, Cached: 500 tokens (50% discount)
      // (500/1M * 0.15) + (500/1M * 0.075) + (500/1M * 0.60)
      // = 0.000075 + 0.0000375 + 0.0003 = 0.0004125
      expect(estimate).toBeCloseTo(0.0004125, 5);
    });
  });

  describe('Budget Tracking', () => {
    it('should track budget usage', async () => {
      await budgetManager.createBudget('user-1', {
        totalBudget: 1.00, // $1.00
        duration: 'daily',
        alertThreshold: 0.5,
        hardLimit: false,
      });

      // Simulate usage
      await budgetManager.recordUsage('user-1', 0.10);
      await budgetManager.recordUsage('user-1', 0.15);

      const status = await budgetManager.getBudgetStatus('user-1');

      expect(status).not.toBeNull();
      expect(status!.currentSpend).toBeCloseTo(0.25, 2);
      expect(status!.remainingBudget).toBeCloseTo(0.75, 2);
      expect(status!.percentUsed).toBeCloseTo(25, 1);
    });

    it('should emit alert when threshold reached', async () => {
      const alerts: BudgetAlertEvent[] = [];
      const eventEmitter = new SilkboardEventEmitter();
      eventEmitter.on('budgetAlert', (e) => alerts.push(e));
      
      const managerWithEvents = new BudgetManager({ eventEmitter });

      await managerWithEvents.createBudget('user-2', {
        totalBudget: 1.00,
        duration: 'daily',
        alertThreshold: 0.5, // Alert at 50%
        hardLimit: false,
      });

      // Use 40% - no alert
      await managerWithEvents.recordUsage('user-2', 0.40);
      expect(alerts.length).toBe(0);

      // Use 20% more (total 60%) - should trigger alert
      await managerWithEvents.recordUsage('user-2', 0.20);
      expect(alerts.length).toBe(1);
      expect(alerts[0].userId).toBe('user-2');
      expect(alerts[0].percentUsed).toBeCloseTo(60, 1);
    });

    it('should block when hard limit exceeded', async () => {
      await budgetManager.createBudget('user-3', {
        totalBudget: 0.50,
        duration: 'daily',
        alertThreshold: 0.8,
        hardLimit: true,
      });

      // Use most of budget
      await budgetManager.recordUsage('user-3', 0.45);

      // Check if we can make another request
      const check = await budgetManager.checkBudget('user-3', 0.10);

      expect(check.allowed).toBe(false);
      expect(check.reason).toBe('exceeded');
    });

    it('should allow when soft limit would be exceeded', async () => {
      await budgetManager.createBudget('user-4', {
        totalBudget: 0.50,
        duration: 'daily',
        alertThreshold: 0.8,
        hardLimit: false, // Soft limit
      });

      // Use most of budget
      await budgetManager.recordUsage('user-4', 0.45);

      // Check if we can make another request that would exceed
      const check = await budgetManager.checkBudget('user-4', 0.10);

      expect(check.allowed).toBe(true);
      expect(check.reason).toBe('would_exceed');
    });
  });

  describe('Integration with Silkboard', () => {
    it.skipIf(!hasOpenAI)('should track real request costs', async () => {
      silk.clearUsage();

      await silk.generateText({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: 'Say "test"' }],
      });

      const usage = silk.getUsage();

      expect(usage.totalCost).toBeGreaterThan(0);
      expect(usage.totalInputTokens).toBeGreaterThan(0);
      expect(usage.totalOutputTokens).toBeGreaterThan(0);
      expect(usage.byModel['gpt-4o-mini']).toBeDefined();
    });

    it.skipIf(!hasOpenAI)('should integrate budget check with requests', async () => {
      await budgetManager.createBudget('api-user', {
        totalBudget: 0.01, // Very small budget
        duration: 'daily',
        alertThreshold: 0.5,
        hardLimit: true,
      });

      // Estimate cost before request
      const estimate = await silk.estimateCost({
        model: 'gpt-4o-mini',
        inputTokens: 100,
        outputTokens: 50,
      });

      // Check budget
      const check = await budgetManager.checkBudget('api-user', estimate);

      if (check.allowed) {
        // Make the request
        const result = await silk.generateText({
          model: 'gpt-4o-mini',
          messages: [{ role: 'user', content: 'Hi' }],
        });

        // Record actual usage
        const records = silk.getUsageRecords();
        const lastRecord = records[records.length - 1];
        await budgetManager.recordUsage('api-user', lastRecord.cost);

        expect(result.text).toBeDefined();
      }

      // Verify budget was updated
      const status = await budgetManager.getBudgetStatus('api-user');
      expect(status!.currentSpend).toBeGreaterThan(0);
    });
  });

  describe('Persistent Budget Store', () => {
    it('should work with custom store', async () => {
      const store = new MemoryBudgetStore();
      const manager = new BudgetManager({ store });

      await manager.createBudget('persistent-user', {
        totalBudget: 10.00,
        duration: 'monthly',
      });

      await manager.recordUsage('persistent-user', 2.50);

      // Create new manager with same store
      const manager2 = new BudgetManager({ store });
      const status = await manager2.getBudgetStatus('persistent-user');

      expect(status).not.toBeNull();
      expect(status!.currentSpend).toBeCloseTo(2.50, 2);
    });
  });
});
