/**
 * Request/response types for Silkboard methods.
 */

import type { LanguageModel } from 'ai';
import type { ModelParameters, ModelConfig } from './config';
import type { ReasoningOverride } from './reasoning';

// EmbeddingModel type from AI SDK
type EmbeddingModelType = ReturnType<any['textEmbeddingModel']>;

// =============================================================================
// Request Options
// =============================================================================

/** Base options for all requests */
export interface BaseRequestOptions {
  model?: string;
  role?: string;
  variant?: string;
  reasoning?: ReasoningOverride;
  parameters?: Partial<ModelParameters>;
  abortSignal?: AbortSignal;
}

/** Options for text generation (streamText, generateText) */
export interface TextOptions extends BaseRequestOptions {
  messages: Array<{
    role: 'system' | 'user' | 'assistant';
    content: string;
  }>;
  system?: string;
  tools?: Record<string, unknown>;
}

/** Options for embedding generation */
export interface EmbedOptions extends BaseRequestOptions {
  value: string | string[];
}

/** Options for reranking */
export interface RerankOptions extends BaseRequestOptions {
  query: string;
  documents: string[];
  topN?: number;
}

// =============================================================================
// Results
// =============================================================================

/** Reranking result */
export interface RerankResult {
  index: number;
  relevanceScore: number;
  document: string;
}

/** Resolved language model (internal) */
export interface ResolvedModel {
  alias: string;
  config: ModelConfig;
  instance: LanguageModel;
  providerOptions: Record<string, unknown>;
  extraBody?: Record<string, unknown>;
}

/** Resolved embedding model (internal) */
export interface ResolvedEmbeddingModel {
  alias: string;
  config: ModelConfig;
  instance: EmbeddingModelType;
}

// =============================================================================
// Usage & Cost Tracking
// =============================================================================

/** Record of a single request's usage */
export interface UsageRecord {
  model: string;
  role?: string;
  variant?: string;
  inputTokens: number;
  outputTokens: number;
  cachedTokens?: number;
  reasoningTokens?: number;
  latencyMs: number;
  cost: number;
  timestamp: Date;
}

/** Aggregated usage summary */
export interface UsageSummary {
  totalCost: number;
  totalInputTokens: number;
  totalOutputTokens: number;
  totalCachedTokens: number;
  totalReasoningTokens: number;
  byModel: Record<string, { cost: number; requests: number }>;
  byRole: Record<string, { cost: number; requests: number }>;
}

// =============================================================================
// Events
// =============================================================================

/** Usage event payload */
export interface UsageEvent extends Omit<UsageRecord, 'timestamp'> {
  timestamp: Date;
}

/** Event types emitted by Silkboard */
export type SilkboardEvent = {
  usage: UsageEvent;
  error: { model: string; error: Error };
};

/** Event handler type */
export type SilkboardEventHandler<K extends keyof SilkboardEvent> = (
  event: SilkboardEvent[K]
) => void;
