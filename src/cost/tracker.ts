import { readFileSync, writeFileSync, existsSync } from 'fs';
import type {
  UsageRecord,
  UsageSummary,
  PricingConfig,
  ModelConfig,
  LLMServiceEvent,
  LLMServiceEventHandler,
} from '../types';

interface PricingCacheEntry {
  pricing: PricingConfig;
  updatedAt: string;
}

type PricingCache = Record<string, PricingCacheEntry>;

export class CostTracker {
  private usage: UsageRecord[] = [];
  private pricingCache: PricingCache = {};
  private pricingCachePath: string | null = null;
  private modelConfigs: Record<string, ModelConfig>;
  private eventHandlers: Map<keyof LLMServiceEvent, Set<LLMServiceEventHandler<any>>> = new Map();

  constructor(
    modelConfigs: Record<string, ModelConfig>,
    pricingCachePath?: string
  ) {
    this.modelConfigs = modelConfigs;
    this.pricingCachePath = pricingCachePath ?? null;

    if (pricingCachePath && existsSync(pricingCachePath)) {
      try {
        const content = readFileSync(pricingCachePath, 'utf-8');
        this.pricingCache = JSON.parse(content);
      } catch (error) {
        console.warn('[CostTracker] Failed to load pricing cache:', error);
      }
    }
  }

  async track(record: Omit<UsageRecord, 'cost' | 'timestamp'>): Promise<UsageRecord> {
    const pricing = await this.getPricing(record.model);
    const cost = this.calculateCost(record, pricing);

    const fullRecord: UsageRecord = {
      ...record,
      cost,
      timestamp: new Date(),
    };

    this.usage.push(fullRecord);
    this.emit('usage', fullRecord);

    return fullRecord;
  }

  private calculateCost(
    record: Omit<UsageRecord, 'cost' | 'timestamp'>,
    pricing: PricingConfig
  ): number {
    const uncachedInput = record.inputTokens - (record.cachedTokens ?? 0);
    const cachedRate = pricing.cached ?? pricing.input * 0.5;
    const reasoningRate = pricing.reasoning ?? pricing.output ?? 0;

    const inputCost = (uncachedInput / 1_000_000) * pricing.input;
    const cachedCost = ((record.cachedTokens ?? 0) / 1_000_000) * cachedRate;
    const outputCost = (record.outputTokens / 1_000_000) * (pricing.output ?? 0);
    const reasoningCost = ((record.reasoningTokens ?? 0) / 1_000_000) * reasoningRate;

    return inputCost + cachedCost + outputCost + reasoningCost;
  }

  async getPricing(modelAlias: string): Promise<PricingConfig> {
    // First check model config
    const modelConfig = this.modelConfigs[modelAlias];
    if (modelConfig?.pricing) {
      return modelConfig.pricing;
    }

    // Check cache
    const cached = this.pricingCache[modelAlias];
    if (cached) {
      const cacheAge = Date.now() - new Date(cached.updatedAt).getTime();
      const oneWeek = 7 * 24 * 60 * 60 * 1000;
      if (cacheAge < oneWeek) {
        return cached.pricing;
      }
    }

    // Fetch from OpenRouter if not found
    try {
      const pricing = await this.fetchPricingFromOpenRouter(modelAlias);
      this.cachePricing(modelAlias, pricing);
      return pricing;
    } catch (error) {
      console.warn(`[CostTracker] Failed to fetch pricing for ${modelAlias}:`, error);
      // Return default pricing
      return { input: 0, output: 0 };
    }
  }

  private async fetchPricingFromOpenRouter(modelId: string): Promise<PricingConfig> {
    const response = await fetch(`https://openrouter.ai/api/v1/models/${modelId}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch model info: ${response.statusText}`);
    }

    const data = await response.json() as {
      pricing?: { prompt?: string; completion?: string };
    };
    
    return {
      input: parseFloat(data.pricing?.prompt ?? '0') * 1_000_000,
      output: parseFloat(data.pricing?.completion ?? '0') * 1_000_000,
    };
  }

  private cachePricing(modelAlias: string, pricing: PricingConfig): void {
    this.pricingCache[modelAlias] = {
      pricing,
      updatedAt: new Date().toISOString(),
    };

    if (this.pricingCachePath) {
      try {
        writeFileSync(
          this.pricingCachePath,
          JSON.stringify(this.pricingCache, null, 2)
        );
      } catch (error) {
        console.warn('[CostTracker] Failed to save pricing cache:', error);
      }
    }
  }

  getSummary(): UsageSummary {
    const byModel: Record<string, { cost: number; requests: number }> = {};
    const byRole: Record<string, { cost: number; requests: number }> = {};

    let totalCost = 0;
    let totalInputTokens = 0;
    let totalOutputTokens = 0;
    let totalCachedTokens = 0;
    let totalReasoningTokens = 0;

    for (const record of this.usage) {
      totalCost += record.cost;
      totalInputTokens += record.inputTokens;
      totalOutputTokens += record.outputTokens;
      totalCachedTokens += record.cachedTokens ?? 0;
      totalReasoningTokens += record.reasoningTokens ?? 0;

      // By model
      if (!byModel[record.model]) {
        byModel[record.model] = { cost: 0, requests: 0 };
      }
      byModel[record.model].cost += record.cost;
      byModel[record.model].requests += 1;

      // By role
      if (record.role) {
        const roleKey = record.variant
          ? `${record.role}.${record.variant}`
          : record.role;
        if (!byRole[roleKey]) {
          byRole[roleKey] = { cost: 0, requests: 0 };
        }
        byRole[roleKey].cost += record.cost;
        byRole[roleKey].requests += 1;
      }
    }

    return {
      totalCost,
      totalInputTokens,
      totalOutputTokens,
      totalCachedTokens,
      totalReasoningTokens,
      byModel,
      byRole,
    };
  }

  getUsageRecords(): UsageRecord[] {
    return [...this.usage];
  }

  clearUsage(): void {
    this.usage = [];
  }

  on<K extends keyof LLMServiceEvent>(
    event: K,
    handler: LLMServiceEventHandler<K>
  ): void {
    if (!this.eventHandlers.has(event)) {
      this.eventHandlers.set(event, new Set());
    }
    this.eventHandlers.get(event)!.add(handler);
  }

  off<K extends keyof LLMServiceEvent>(
    event: K,
    handler: LLMServiceEventHandler<K>
  ): void {
    this.eventHandlers.get(event)?.delete(handler);
  }

  private emit<K extends keyof LLMServiceEvent>(
    event: K,
    data: LLMServiceEvent[K]
  ): void {
    const handlers = this.eventHandlers.get(event);
    if (handlers) {
      for (const handler of handlers) {
        try {
          handler(data);
        } catch (error) {
          console.error(`[CostTracker] Event handler error:`, error);
        }
      }
    }
  }
}

export function createCostTracker(
  modelConfigs: Record<string, ModelConfig>,
  pricingCachePath?: string
): CostTracker {
  return new CostTracker(modelConfigs, pricingCachePath);
}
