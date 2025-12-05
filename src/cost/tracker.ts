import { readFileSync, writeFileSync, existsSync } from 'fs';
import type {
  UsageRecord,
  UsageSummary,
  PricingConfig,
  ModelConfig,
  BillingUnit,
} from '../types';
import type { SilkboardEventEmitter } from '../events';
import type { ProviderRegistry, PricingTier } from '../registry';

/** Provider discount configuration */
export interface ProviderDiscount {
  /** Provider ID (e.g., 'openai', 'anthropic') */
  provider: string;
  /** Discount percentage (0-100) */
  discountPercent: number;
  /** Optional: only apply to specific models */
  models?: string[];
  /** Optional: discount description */
  description?: string;
}

interface PricingCacheEntry {
  pricing: PricingConfig;
  updatedAt: string;
}

type PricingCache = Record<string, PricingCacheEntry>;

export interface CostTrackerOptions {
  modelConfigs: Record<string, ModelConfig>;
  pricingCachePath?: string;
  eventEmitter?: SilkboardEventEmitter;
  /** Provider registry for YAML-based pricing lookup */
  registry?: ProviderRegistry;
  /** Provider-specific discounts */
  discounts?: ProviderDiscount[];
}

export class CostTracker {
  private usage: UsageRecord[] = [];
  private pricingCache: PricingCache = {};
  private pricingCachePath: string | null = null;
  private modelConfigs: Record<string, ModelConfig>;
  private eventEmitter?: SilkboardEventEmitter;
  private registry?: ProviderRegistry;
  private discounts: ProviderDiscount[] = [];
  
  /** Average characters per token for character-based billing (Gemini) */
  private static readonly CHARS_PER_TOKEN = 4;

  constructor(options: CostTrackerOptions);
  /** @deprecated Use options object instead */
  constructor(
    modelConfigs: Record<string, ModelConfig>,
    pricingCachePath?: string,
    eventEmitter?: SilkboardEventEmitter
  );
  constructor(
    optionsOrModelConfigs: CostTrackerOptions | Record<string, ModelConfig>,
    pricingCachePath?: string,
    eventEmitter?: SilkboardEventEmitter
  ) {
    // Handle both old and new constructor signatures
    if ('modelConfigs' in optionsOrModelConfigs) {
      const options = optionsOrModelConfigs as CostTrackerOptions;
      this.modelConfigs = options.modelConfigs;
      this.pricingCachePath = options.pricingCachePath ?? null;
      this.eventEmitter = options.eventEmitter;
      this.registry = options.registry;
      this.discounts = options.discounts ?? [];
    } else {
      this.modelConfigs = optionsOrModelConfigs;
      this.pricingCachePath = pricingCachePath ?? null;
      this.eventEmitter = eventEmitter;
    }

    if (this.pricingCachePath && existsSync(this.pricingCachePath)) {
      try {
        const content = readFileSync(this.pricingCachePath, 'utf-8');
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
    this.eventEmitter?.emit('usage', fullRecord);

    return fullRecord;
  }

  private calculateCost(
    record: Omit<UsageRecord, 'cost' | 'timestamp'>,
    pricing: PricingConfig
  ): number {
    const totalInputTokens = record.inputTokens;
    const uncachedInput = totalInputTokens - (record.cachedTokens ?? 0);
    
    // Get effective rates (may be tiered based on context size)
    const effectiveRates = this.getEffectiveRates(pricing, totalInputTokens);
    
    // Check billing unit - handle character-based billing (Gemini)
    const billingUnit = this.getBillingUnit(record.model);
    const divisor = billingUnit === 'character' 
      ? 1_000_000 / CostTracker.CHARS_PER_TOKEN  // Convert tokens to characters
      : 1_000_000;
    
    const cachedRate = effectiveRates.cached ?? effectiveRates.input * 0.5;
    const reasoningRate = pricing.reasoning ?? effectiveRates.output ?? 0;

    const inputCost = (uncachedInput / divisor) * effectiveRates.input;
    const cachedCost = ((record.cachedTokens ?? 0) / divisor) * cachedRate;
    const outputCost = (record.outputTokens / divisor) * (effectiveRates.output ?? 0);
    const reasoningCost = ((record.reasoningTokens ?? 0) / divisor) * reasoningRate;

    const baseCost = inputCost + cachedCost + outputCost + reasoningCost;
    
    // Apply provider discount if configured
    const discount = this.getDiscount(record.model);
    if (discount > 0) {
      return baseCost * (1 - discount / 100);
    }
    
    return baseCost;
  }

  /**
   * Get billing unit for a model (token or character).
   */
  private getBillingUnit(modelAlias: string): BillingUnit {
    // Check registry for billing unit
    if (this.registry) {
      const result = this.registry.getModel(modelAlias);
      if (result?.defaults?.billing_unit) {
        return result.defaults.billing_unit;
      }
      // Check model-specific pricing unit
      if (result?.model.pricing?.unit === 'character') {
        return 'character';
      }
    }
    
    // Check model config provider for known character-based providers
    const modelConfig = this.modelConfigs[modelAlias];
    if (modelConfig?.provider === 'google') {
      // Gemini uses character-based billing
      return 'character';
    }
    
    return 'token';
  }

  /**
   * Get discount percentage for a model.
   */
  private getDiscount(modelAlias: string): number {
    const modelConfig = this.modelConfigs[modelAlias];
    if (!modelConfig) return 0;
    
    for (const discount of this.discounts) {
      if (discount.provider === modelConfig.provider) {
        // Check if discount applies to specific models
        if (discount.models && discount.models.length > 0) {
          if (discount.models.includes(modelAlias) || discount.models.includes(modelConfig.model_id)) {
            return discount.discountPercent;
          }
        } else {
          // Discount applies to all models from this provider
          return discount.discountPercent;
        }
      }
    }
    
    return 0;
  }

  /**
   * Add a provider discount.
   */
  addDiscount(discount: ProviderDiscount): void {
    this.discounts.push(discount);
  }

  /**
   * Remove discounts for a provider.
   */
  removeDiscount(provider: string): void {
    this.discounts = this.discounts.filter(d => d.provider !== provider);
  }

  /**
   * Get all configured discounts.
   */
  getDiscounts(): ProviderDiscount[] {
    return [...this.discounts];
  }

  /**
   * Get effective pricing rates based on context size (for tiered pricing).
   * E.g., Sonnet 4.5: $3/$15 for ≤200K, $6/$22.50 for >200K
   */
  private getEffectiveRates(
    pricing: PricingConfig,
    totalInputTokens: number
  ): { input: number; output?: number; cached?: number } {
    // If no tiered pricing, use base rates
    if (!pricing.tiered || pricing.tiered.length === 0) {
      return {
        input: pricing.input,
        output: pricing.output,
        cached: pricing.cached,
      };
    }

    // Find the applicable tier based on total input tokens
    // Tiers are sorted by up_to threshold
    const sortedTiers = [...pricing.tiered].sort((a, b) => {
      const aLimit = a.up_to === 'unlimited' ? Infinity : a.up_to;
      const bLimit = b.up_to === 'unlimited' ? Infinity : b.up_to;
      return aLimit - bLimit;
    });

    for (const tier of sortedTiers) {
      const threshold = tier.up_to === 'unlimited' ? Infinity : tier.up_to;
      if (totalInputTokens <= threshold) {
        return {
          input: tier.input,
          output: tier.output ?? pricing.output,
          cached: tier.cached ?? pricing.cached,
        };
      }
    }

    // If no tier matches (shouldn't happen with 'unlimited'), use last tier
    const lastTier = sortedTiers[sortedTiers.length - 1];
    return {
      input: lastTier.input,
      output: lastTier.output ?? pricing.output,
      cached: lastTier.cached ?? pricing.cached,
    };
  }

  async getPricing(modelAlias: string): Promise<PricingConfig> {
    // 1. First check model config (user overrides)
    const modelConfig = this.modelConfigs[modelAlias];
    if (modelConfig?.pricing) {
      return modelConfig.pricing;
    }

    // 2. Check provider registry (YAML-based pricing)
    if (this.registry) {
      const registryPricing = this.registry.getPricing(modelAlias);
      if (registryPricing) {
        const config: PricingConfig = {
          input: registryPricing.input ?? 0,
          output: registryPricing.output ?? 0,
          cached: registryPricing.cached_input,
          reasoning: registryPricing.reasoning,
          per_search: registryPricing.per_search,
        };
        
        // Include tiered pricing if present
        if (registryPricing.tiered && registryPricing.tiered.length > 0) {
          config.tiered = registryPricing.tiered.map((tier: PricingTier) => ({
            up_to: tier.up_to,
            input: tier.input ?? 0,
            output: tier.output,
            cached: tier.cached_input,
          }));
        }
        
        return config;
      }
    }

    // 3. Check local cache
    const cached = this.pricingCache[modelAlias];
    if (cached) {
      const cacheAge = Date.now() - new Date(cached.updatedAt).getTime();
      const oneWeek = 7 * 24 * 60 * 60 * 1000;
      if (cacheAge < oneWeek) {
        return cached.pricing;
      }
    }

    // 4. Fetch from OpenRouter as fallback
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

  /**
   * Estimate cost before making a request.
   * Useful for budget checks and cost projections.
   */
  async estimateCost(params: {
    model: string;
    inputTokens: number;
    outputTokens?: number;
    cachedTokens?: number;
    reasoningTokens?: number;
  }): Promise<number> {
    const pricing = await this.getPricing(params.model);
    
    // Get effective rates (may be tiered based on context size)
    const effectiveRates = this.getEffectiveRates(pricing, params.inputTokens);
    
    // Check billing unit - handle character-based billing (Gemini)
    const billingUnit = this.getBillingUnit(params.model);
    const divisor = billingUnit === 'character' 
      ? 1_000_000 / CostTracker.CHARS_PER_TOKEN
      : 1_000_000;
    
    const uncachedInput = params.inputTokens - (params.cachedTokens ?? 0);
    const cachedRate = effectiveRates.cached ?? effectiveRates.input * 0.5;
    const reasoningRate = pricing.reasoning ?? effectiveRates.output ?? 0;

    const inputCost = (uncachedInput / divisor) * effectiveRates.input;
    const cachedCost = ((params.cachedTokens ?? 0) / divisor) * cachedRate;
    const outputCost = ((params.outputTokens ?? 0) / divisor) * (effectiveRates.output ?? 0);
    const reasoningCost = ((params.reasoningTokens ?? 0) / divisor) * reasoningRate;

    const baseCost = inputCost + cachedCost + outputCost + reasoningCost;
    
    // Apply provider discount if configured
    const discount = this.getDiscount(params.model);
    if (discount > 0) {
      return baseCost * (1 - discount / 100);
    }
    
    return baseCost;
  }

  clearUsage(): void {
    this.usage = [];
  }

}

export function createCostTracker(
  modelConfigs: Record<string, ModelConfig>,
  pricingCachePath?: string,
  eventEmitter?: SilkboardEventEmitter
): CostTracker {
  return new CostTracker(modelConfigs, pricingCachePath, eventEmitter);
}
