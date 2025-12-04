import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BudgetManager, MemoryBudgetStore } from '../../../src/budget';
import { SilkboardEventEmitter } from '../../../src/events';

describe('BudgetManager', () => {
  let manager: BudgetManager;
  let store: MemoryBudgetStore;

  beforeEach(() => {
    store = new MemoryBudgetStore();
    manager = new BudgetManager({ store });
  });

  describe('createBudget', () => {
    it('should create a budget for a user', async () => {
      await manager.createBudget('user-1', {
        totalBudget: 100,
        duration: 'monthly',
      });

      const status = await manager.getBudgetStatus('user-1');
      expect(status).not.toBeNull();
      expect(status!.config.totalBudget).toBe(100);
      expect(status!.config.duration).toBe('monthly');
      expect(status!.currentSpend).toBe(0);
    });

    it('should set default alertThreshold to 0.8', async () => {
      await manager.createBudget('user-1', {
        totalBudget: 100,
        duration: 'monthly',
      });

      const status = await manager.getBudgetStatus('user-1');
      expect(status!.config.alertThreshold).toBe(0.8);
    });

    it('should set default hardLimit to false', async () => {
      await manager.createBudget('user-1', {
        totalBudget: 100,
        duration: 'monthly',
      });

      const status = await manager.getBudgetStatus('user-1');
      expect(status!.config.hardLimit).toBe(false);
    });

    it('should respect custom alertThreshold', async () => {
      await manager.createBudget('user-1', {
        totalBudget: 100,
        duration: 'monthly',
        alertThreshold: 0.5,
      });

      const status = await manager.getBudgetStatus('user-1');
      expect(status!.config.alertThreshold).toBe(0.5);
    });
  });

  describe('checkBudget', () => {
    it('should allow request when no budget configured', async () => {
      const result = await manager.checkBudget('unknown-user', 10);

      expect(result.allowed).toBe(true);
      expect(result.reason).toBe('ok');
      expect(result.remainingBudget).toBe(Infinity);
    });

    it('should allow request within budget', async () => {
      await manager.createBudget('user-1', {
        totalBudget: 100,
        duration: 'monthly',
      });

      const result = await manager.checkBudget('user-1', 10);

      expect(result.allowed).toBe(true);
      expect(result.reason).toBe('ok');
      expect(result.remainingBudget).toBe(100);
      expect(result.estimatedTotal).toBe(10);
    });

    it('should warn when request would exceed budget (soft limit)', async () => {
      await manager.createBudget('user-1', {
        totalBudget: 100,
        duration: 'monthly',
        hardLimit: false,
      });
      await manager.recordUsage('user-1', 95);

      const result = await manager.checkBudget('user-1', 10);

      expect(result.allowed).toBe(true); // Soft limit allows
      expect(result.reason).toBe('would_exceed');
      expect(result.estimatedTotal).toBe(105);
    });

    it('should block when request would exceed budget (hard limit)', async () => {
      await manager.createBudget('user-1', {
        totalBudget: 100,
        duration: 'monthly',
        hardLimit: true,
      });
      await manager.recordUsage('user-1', 95);

      const result = await manager.checkBudget('user-1', 10);

      expect(result.allowed).toBe(false);
      expect(result.reason).toBe('would_exceed');
    });

    it('should report exceeded when already over budget', async () => {
      await manager.createBudget('user-1', {
        totalBudget: 100,
        duration: 'monthly',
        hardLimit: true,
      });
      await manager.recordUsage('user-1', 110);

      const result = await manager.checkBudget('user-1', 5);

      expect(result.allowed).toBe(false);
      expect(result.reason).toBe('exceeded');
    });
  });

  describe('recordUsage', () => {
    it('should accumulate usage', async () => {
      await manager.createBudget('user-1', {
        totalBudget: 100,
        duration: 'monthly',
      });

      await manager.recordUsage('user-1', 10);
      await manager.recordUsage('user-1', 20);

      const status = await manager.getBudgetStatus('user-1');
      expect(status!.currentSpend).toBe(30);
    });

    it('should do nothing for unknown user', async () => {
      // Should not throw
      await manager.recordUsage('unknown-user', 10);
    });
  });

  describe('getBudgetStatus', () => {
    it('should return null for unknown user', async () => {
      const status = await manager.getBudgetStatus('unknown-user');
      expect(status).toBeNull();
    });

    it('should calculate percentUsed correctly', async () => {
      await manager.createBudget('user-1', {
        totalBudget: 100,
        duration: 'monthly',
      });
      await manager.recordUsage('user-1', 25);

      const status = await manager.getBudgetStatus('user-1');
      expect(status!.percentUsed).toBe(25);
    });

    it('should calculate remainingBudget correctly', async () => {
      await manager.createBudget('user-1', {
        totalBudget: 100,
        duration: 'monthly',
      });
      await manager.recordUsage('user-1', 30);

      const status = await manager.getBudgetStatus('user-1');
      expect(status!.remainingBudget).toBe(70);
    });

    it('should set isExceeded when over budget', async () => {
      await manager.createBudget('user-1', {
        totalBudget: 100,
        duration: 'monthly',
      });
      await manager.recordUsage('user-1', 110);

      const status = await manager.getBudgetStatus('user-1');
      expect(status!.isExceeded).toBe(true);
      expect(status!.remainingBudget).toBe(-10);
    });

    it('should set isAlertThresholdReached when at threshold', async () => {
      await manager.createBudget('user-1', {
        totalBudget: 100,
        duration: 'monthly',
        alertThreshold: 0.8,
      });
      await manager.recordUsage('user-1', 80);

      const status = await manager.getBudgetStatus('user-1');
      expect(status!.isAlertThresholdReached).toBe(true);
    });
  });

  describe('deleteBudget', () => {
    it('should remove budget for user', async () => {
      await manager.createBudget('user-1', {
        totalBudget: 100,
        duration: 'monthly',
      });

      await manager.deleteBudget('user-1');

      const status = await manager.getBudgetStatus('user-1');
      expect(status).toBeNull();
    });
  });

  describe('period reset', () => {
    it('should reset budget when period expires', async () => {
      // Create budget with a past period end
      const record = {
        userId: 'user-1',
        config: {
          totalBudget: 100,
          duration: 'daily' as const,
          alertThreshold: 0.8,
          hardLimit: false,
        },
        currentSpend: 50,
        periodStart: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
        periodEnd: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
        alertSent: true,
      };
      await store.setBudget('user-1', record);

      // Getting status should reset the period
      const status = await manager.getBudgetStatus('user-1');

      expect(status!.currentSpend).toBe(0);
      expect(status!.periodEnd.getTime()).toBeGreaterThan(Date.now());
    });
  });

  describe('events', () => {
    it('should emit budgetAlert when threshold is crossed', async () => {
      const emitter = new SilkboardEventEmitter();
      const managerWithEvents = new BudgetManager({ store, eventEmitter: emitter });
      const alerts: unknown[] = [];
      emitter.on('budgetAlert', (event) => alerts.push(event));

      await managerWithEvents.createBudget('user-1', {
        totalBudget: 100,
        duration: 'monthly',
        alertThreshold: 0.5,
      });

      // Record usage that crosses threshold
      await managerWithEvents.recordUsage('user-1', 60);

      expect(alerts).toHaveLength(1);
      expect((alerts[0] as any).userId).toBe('user-1');
      expect((alerts[0] as any).percentUsed).toBe(60);
    });

    it('should emit budgetExceeded when budget is exceeded', async () => {
      const emitter = new SilkboardEventEmitter();
      const managerWithEvents = new BudgetManager({ store, eventEmitter: emitter });
      const exceeded: unknown[] = [];
      emitter.on('budgetExceeded', (event) => exceeded.push(event));

      await managerWithEvents.createBudget('user-1', {
        totalBudget: 100,
        duration: 'monthly',
      });

      // Record usage that exceeds budget
      await managerWithEvents.recordUsage('user-1', 110);

      expect(exceeded).toHaveLength(1);
      expect((exceeded[0] as any).userId).toBe('user-1');
      expect((exceeded[0] as any).overage).toBe(10);
    });

    it('should only emit alert once per period', async () => {
      const emitter = new SilkboardEventEmitter();
      const managerWithEvents = new BudgetManager({ store, eventEmitter: emitter });
      const alerts: unknown[] = [];
      emitter.on('budgetAlert', (event) => alerts.push(event));

      await managerWithEvents.createBudget('user-1', {
        totalBudget: 100,
        duration: 'monthly',
        alertThreshold: 0.5,
      });

      await managerWithEvents.recordUsage('user-1', 60);
      await managerWithEvents.recordUsage('user-1', 10);
      await managerWithEvents.recordUsage('user-1', 10);

      expect(alerts).toHaveLength(1); // Only one alert
    });
  });
});

describe('MemoryBudgetStore', () => {
  let store: MemoryBudgetStore;

  beforeEach(() => {
    store = new MemoryBudgetStore();
  });

  it('should store and retrieve budgets', async () => {
    const record = {
      userId: 'user-1',
      config: {
        totalBudget: 100,
        duration: 'monthly' as const,
      },
      currentSpend: 0,
      periodStart: new Date(),
      periodEnd: new Date(),
      alertSent: false,
    };

    await store.setBudget('user-1', record);
    const retrieved = await store.getBudget('user-1');

    expect(retrieved).toEqual(record);
  });

  it('should return null for unknown user', async () => {
    const result = await store.getBudget('unknown');
    expect(result).toBeNull();
  });

  it('should delete budgets', async () => {
    await store.setBudget('user-1', {
      userId: 'user-1',
      config: { totalBudget: 100, duration: 'monthly' },
      currentSpend: 0,
      periodStart: new Date(),
      periodEnd: new Date(),
      alertSent: false,
    });

    await store.deleteBudget('user-1');
    const result = await store.getBudget('user-1');

    expect(result).toBeNull();
  });

  it('should list all users', async () => {
    await store.setBudget('user-1', {
      userId: 'user-1',
      config: { totalBudget: 100, duration: 'monthly' },
      currentSpend: 0,
      periodStart: new Date(),
      periodEnd: new Date(),
      alertSent: false,
    });
    await store.setBudget('user-2', {
      userId: 'user-2',
      config: { totalBudget: 200, duration: 'weekly' },
      currentSpend: 0,
      periodStart: new Date(),
      periodEnd: new Date(),
      alertSent: false,
    });

    const users = await store.listUsers();

    expect(users).toContain('user-1');
    expect(users).toContain('user-2');
    expect(users).toHaveLength(2);
  });

  it('should clear all budgets', async () => {
    await store.setBudget('user-1', {
      userId: 'user-1',
      config: { totalBudget: 100, duration: 'monthly' },
      currentSpend: 0,
      periodStart: new Date(),
      periodEnd: new Date(),
      alertSent: false,
    });

    store.clear();
    const users = await store.listUsers();

    expect(users).toHaveLength(0);
  });
});
