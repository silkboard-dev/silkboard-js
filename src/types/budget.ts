/**
 * Budget management types for per-user cost tracking and limits.
 */

/** Budget duration period */
export type BudgetDuration = 'daily' | 'weekly' | 'monthly' | 'yearly';

/**
 * Configuration for a user's budget.
 */
export interface BudgetConfig {
  /** Maximum spend allowed in the period (in USD) */
  totalBudget: number;
  
  /** Budget period duration */
  duration: BudgetDuration;
  
  /** 
   * Threshold for alert (0.0-1.0). 
   * When spend reaches this percentage, an alert event is emitted.
   * @default 0.8 (80%)
   */
  alertThreshold?: number;
  
  /**
   * If true, requests are blocked when budget is exceeded.
   * If false, only warnings are emitted.
   * @default false
   */
  hardLimit?: boolean;
}

/**
 * Internal record stored for each user's budget.
 */
export interface BudgetRecord {
  userId: string;
  config: BudgetConfig;
  currentSpend: number;
  periodStart: Date;
  periodEnd: Date;
  alertSent: boolean;
}

/**
 * Current status of a user's budget.
 */
export interface BudgetStatus {
  userId: string;
  config: BudgetConfig;
  
  /** Total spent in current period */
  currentSpend: number;
  
  /** Remaining budget (can be negative if exceeded) */
  remainingBudget: number;
  
  /** Percentage of budget used (0-100+) */
  percentUsed: number;
  
  /** Start of current budget period */
  periodStart: Date;
  
  /** End of current budget period */
  periodEnd: Date;
  
  /** True if spend exceeds totalBudget */
  isExceeded: boolean;
  
  /** True if spend has reached alertThreshold */
  isAlertThresholdReached: boolean;
}

/**
 * Result of checking if a request is allowed within budget.
 */
export interface BudgetCheckResult {
  /** Whether the request is allowed */
  allowed: boolean;
  
  /** Reason for the result */
  reason: 'ok' | 'exceeded' | 'would_exceed';
  
  /** Current spend before this request */
  currentSpend: number;
  
  /** Remaining budget before this request */
  remainingBudget: number;
  
  /** Estimated total if request proceeds */
  estimatedTotal?: number;
}

/**
 * Event emitted when budget alert threshold is reached.
 */
export interface BudgetAlertEvent {
  userId: string;
  currentSpend: number;
  totalBudget: number;
  percentUsed: number;
  threshold: number;
  timestamp: Date;
}

/**
 * Event emitted when budget is exceeded.
 */
export interface BudgetExceededEvent {
  userId: string;
  currentSpend: number;
  totalBudget: number;
  overage: number;
  hardLimit: boolean;
  timestamp: Date;
}

/**
 * Pluggable storage interface for budget persistence.
 * 
 * @example
 * ```typescript
 * // Redis implementation
 * class RedisBudgetStore implements BudgetStore {
 *   async getBudget(userId: string) {
 *     const data = await redis.get(`budget:${userId}`);
 *     return data ? JSON.parse(data) : null;
 *   }
 *   // ...
 * }
 * ```
 */
export interface BudgetStore {
  /** Get budget record for a user */
  getBudget(userId: string): Promise<BudgetRecord | null>;
  
  /** Set/update budget record for a user */
  setBudget(userId: string, record: BudgetRecord): Promise<void>;
  
  /** Delete budget record for a user */
  deleteBudget(userId: string): Promise<void>;
  
  /** List all user IDs with budgets (optional) */
  listUsers?(): Promise<string[]>;
}
