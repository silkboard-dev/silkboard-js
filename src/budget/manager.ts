/**
 * Budget management for per-user cost tracking and limits.
 * 
 * @example
 * ```typescript
 * const manager = new BudgetManager();
 * 
 * // Create a budget for a user
 * await manager.createBudget('user-123', {
 *   totalBudget: 100,
 *   duration: 'monthly',
 *   alertThreshold: 0.8,
 *   hardLimit: true,
 * });
 * 
 * // Check if a request is allowed
 * const check = await manager.checkBudget('user-123', 0.05);
 * if (!check.allowed) {
 *   throw new Error('Budget exceeded');
 * }
 * 
 * // Record usage after request
 * await manager.recordUsage('user-123', 0.05);
 * ```
 */

import type {
  BudgetConfig,
  BudgetRecord,
  BudgetStatus,
  BudgetCheckResult,
  BudgetStore,
} from '../types';
import type { SilkboardEventEmitter } from '../events';
import { MemoryBudgetStore } from './store';

/** Default alert threshold (80%) */
const DEFAULT_ALERT_THRESHOLD = 0.8;

export interface BudgetManagerConfig {
  /** Storage backend for budget data */
  store?: BudgetStore;
  /** Event emitter for budget alerts */
  eventEmitter?: SilkboardEventEmitter;
}

/**
 * Manages per-user budgets with configurable limits and alerts.
 */
export class BudgetManager {
  private store: BudgetStore;
  private eventEmitter?: SilkboardEventEmitter;

  constructor(config: BudgetManagerConfig = {}) {
    this.store = config.store ?? new MemoryBudgetStore();
    this.eventEmitter = config.eventEmitter;
  }

  /**
   * Create or update a budget for a user.
   * 
   * @param userId - Unique user identifier
   * @param config - Budget configuration
   */
  async createBudget(userId: string, config: BudgetConfig): Promise<void> {
    const { periodStart, periodEnd } = this.calculatePeriod(config.duration);
    
    const record: BudgetRecord = {
      userId,
      config: {
        ...config,
        alertThreshold: config.alertThreshold ?? DEFAULT_ALERT_THRESHOLD,
        hardLimit: config.hardLimit ?? false,
      },
      currentSpend: 0,
      periodStart,
      periodEnd,
      alertSent: false,
    };

    await this.store.setBudget(userId, record);
  }

  /**
   * Check if a request with estimated cost is allowed within budget.
   * 
   * @param userId - User to check
   * @param estimatedCost - Estimated cost of the request in USD
   * @returns Check result with allowed status and details
   */
  async checkBudget(userId: string, estimatedCost: number): Promise<BudgetCheckResult> {
    const record = await this.getOrResetBudget(userId);
    
    if (!record) {
      // No budget configured = allowed
      return {
        allowed: true,
        reason: 'ok',
        currentSpend: 0,
        remainingBudget: Infinity,
      };
    }

    const { config, currentSpend } = record;
    const remainingBudget = config.totalBudget - currentSpend;
    const estimatedTotal = currentSpend + estimatedCost;

    // Already exceeded
    if (currentSpend >= config.totalBudget) {
      return {
        allowed: !config.hardLimit,
        reason: 'exceeded',
        currentSpend,
        remainingBudget,
        estimatedTotal,
      };
    }

    // Would exceed with this request
    if (estimatedTotal > config.totalBudget) {
      return {
        allowed: !config.hardLimit,
        reason: 'would_exceed',
        currentSpend,
        remainingBudget,
        estimatedTotal,
      };
    }

    return {
      allowed: true,
      reason: 'ok',
      currentSpend,
      remainingBudget,
      estimatedTotal,
    };
  }

  /**
   * Record usage for a user after a request completes.
   * Emits budget events if thresholds are crossed.
   * 
   * @param userId - User who made the request
   * @param cost - Actual cost of the request in USD
   */
  async recordUsage(userId: string, cost: number): Promise<void> {
    const record = await this.getOrResetBudget(userId);
    
    if (!record) {
      // No budget configured, nothing to record
      return;
    }

    const previousSpend = record.currentSpend;
    record.currentSpend += cost;

    const { config } = record;
    const threshold = config.alertThreshold ?? DEFAULT_ALERT_THRESHOLD;
    const thresholdAmount = config.totalBudget * threshold;

    // Check if we crossed the alert threshold
    if (!record.alertSent && record.currentSpend >= thresholdAmount) {
      record.alertSent = true;
      this.emitBudgetAlert(userId, record);
    }

    // Check if we exceeded the budget
    if (previousSpend < config.totalBudget && record.currentSpend >= config.totalBudget) {
      this.emitBudgetExceeded(userId, record);
    }

    await this.store.setBudget(userId, record);
  }

  /**
   * Get the current budget status for a user.
   * 
   * @param userId - User to get status for
   * @returns Budget status or null if no budget configured
   */
  async getBudgetStatus(userId: string): Promise<BudgetStatus | null> {
    const record = await this.getOrResetBudget(userId);
    
    if (!record) {
      return null;
    }

    const { config, currentSpend, periodStart, periodEnd } = record;
    const remainingBudget = config.totalBudget - currentSpend;
    const percentUsed = (currentSpend / config.totalBudget) * 100;
    const threshold = config.alertThreshold ?? DEFAULT_ALERT_THRESHOLD;

    return {
      userId,
      config,
      currentSpend,
      remainingBudget,
      percentUsed,
      periodStart,
      periodEnd,
      isExceeded: currentSpend >= config.totalBudget,
      isAlertThresholdReached: currentSpend >= config.totalBudget * threshold,
    };
  }

  /**
   * Delete a user's budget.
   * 
   * @param userId - User to delete budget for
   */
  async deleteBudget(userId: string): Promise<void> {
    await this.store.deleteBudget(userId);
  }

  /**
   * Get budget record, resetting if period has expired.
   */
  private async getOrResetBudget(userId: string): Promise<BudgetRecord | null> {
    const record = await this.store.getBudget(userId);
    
    if (!record) {
      return null;
    }

    // Check if period has expired
    const now = new Date();
    if (now >= record.periodEnd) {
      // Reset for new period
      const { periodStart, periodEnd } = this.calculatePeriod(record.config.duration);
      record.currentSpend = 0;
      record.periodStart = periodStart;
      record.periodEnd = periodEnd;
      record.alertSent = false;
      await this.store.setBudget(userId, record);
    }

    return record;
  }

  /**
   * Calculate period start and end dates based on duration.
   */
  private calculatePeriod(duration: BudgetConfig['duration']): { periodStart: Date; periodEnd: Date } {
    const now = new Date();
    const periodStart = new Date(now);
    const periodEnd = new Date(now);

    // Reset to start of current period
    switch (duration) {
      case 'daily':
        periodStart.setHours(0, 0, 0, 0);
        periodEnd.setHours(0, 0, 0, 0);
        periodEnd.setDate(periodEnd.getDate() + 1);
        break;

      case 'weekly':
        // Start of week (Sunday)
        const dayOfWeek = periodStart.getDay();
        periodStart.setDate(periodStart.getDate() - dayOfWeek);
        periodStart.setHours(0, 0, 0, 0);
        periodEnd.setTime(periodStart.getTime());
        periodEnd.setDate(periodEnd.getDate() + 7);
        break;

      case 'monthly':
        periodStart.setDate(1);
        periodStart.setHours(0, 0, 0, 0);
        periodEnd.setMonth(periodEnd.getMonth() + 1);
        periodEnd.setDate(1);
        periodEnd.setHours(0, 0, 0, 0);
        break;

      case 'yearly':
        periodStart.setMonth(0, 1);
        periodStart.setHours(0, 0, 0, 0);
        periodEnd.setFullYear(periodEnd.getFullYear() + 1);
        periodEnd.setMonth(0, 1);
        periodEnd.setHours(0, 0, 0, 0);
        break;
    }

    return { periodStart, periodEnd };
  }

  private emitBudgetAlert(userId: string, record: BudgetRecord): void {
    if (!this.eventEmitter) return;

    const threshold = record.config.alertThreshold ?? DEFAULT_ALERT_THRESHOLD;
    this.eventEmitter.emit('budgetAlert', {
      userId,
      currentSpend: record.currentSpend,
      totalBudget: record.config.totalBudget,
      percentUsed: (record.currentSpend / record.config.totalBudget) * 100,
      threshold: threshold * 100,
      timestamp: new Date(),
    });
  }

  private emitBudgetExceeded(userId: string, record: BudgetRecord): void {
    if (!this.eventEmitter) return;

    this.eventEmitter.emit('budgetExceeded', {
      userId,
      currentSpend: record.currentSpend,
      totalBudget: record.config.totalBudget,
      overage: record.currentSpend - record.config.totalBudget,
      hardLimit: record.config.hardLimit ?? false,
      timestamp: new Date(),
    });
  }
}

/**
 * Create a new BudgetManager instance.
 */
export function createBudgetManager(config?: BudgetManagerConfig): BudgetManager {
  return new BudgetManager(config);
}
