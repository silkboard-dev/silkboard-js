/**
 * Budget storage implementations.
 */

import type { BudgetRecord, BudgetStore } from '../types';

/**
 * In-memory budget store for development and testing.
 * 
 * Note: Data is lost when the process restarts.
 * For production, implement a persistent BudgetStore (Redis, database, etc.)
 * 
 * @example
 * ```typescript
 * const store = new MemoryBudgetStore();
 * const manager = new BudgetManager({ store });
 * ```
 */
export class MemoryBudgetStore implements BudgetStore {
  private budgets: Map<string, BudgetRecord> = new Map();

  async getBudget(userId: string): Promise<BudgetRecord | null> {
    return this.budgets.get(userId) ?? null;
  }

  async setBudget(userId: string, record: BudgetRecord): Promise<void> {
    this.budgets.set(userId, record);
  }

  async deleteBudget(userId: string): Promise<void> {
    this.budgets.delete(userId);
  }

  async listUsers(): Promise<string[]> {
    return Array.from(this.budgets.keys());
  }

  /** Clear all budgets (useful for testing) */
  clear(): void {
    this.budgets.clear();
  }
}

/**
 * Create a new MemoryBudgetStore instance.
 */
export function createMemoryBudgetStore(): MemoryBudgetStore {
  return new MemoryBudgetStore();
}
