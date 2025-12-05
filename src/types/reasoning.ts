/**
 * Reasoning/thinking configuration types for different providers.
 * 
 * Silkboard provides a unified reasoning interface that maps to AI SDK's
 * provider-specific `providerOptions`. We translate, not duplicate.
 */

// =============================================================================
// Reasoning Style Types
// =============================================================================

/** Reasoning implementation style */
export type ReasoningStyle =
  | 'effort'        // OpenAI, xAI, Groq
  | 'budget'        // Anthropic, Google 2.5
  | 'level'         // Google Gemini 3+
  | 'toggle'        // Simple on/off (DeepSeek)
  | 'toggle_budget' // Toggle + optional budget (Cohere, Alibaba)
  | 'hybrid'        // Alibaba: enable_thinking + thinking_budget
  | 'interleaved'   // Minimax: reasoning_split
  | 'transparent'   // Mistral: prompt_mode
  | 'none';         // No reasoning support

/** Effort levels for OpenAI-style reasoning */
export type EffortLevel =
  | 'none'     // OpenAI GPT-5.1 only
  | 'minimal'  // OpenAI
  | 'low'      // OpenAI, xAI, Groq
  | 'default'  // Groq
  | 'medium'   // OpenAI, Groq
  | 'high';    // OpenAI, xAI, Groq

/** Thinking levels for Google Gemini 3+ */
export type ThinkingLevel = 'low' | 'medium' | 'high';

/** Reasoning output format (Groq, Minimax) */
export type ReasoningOutputFormat =
  | 'parsed'      // Structured reasoning output
  | 'raw'         // Raw reasoning text
  | 'hidden'      // Reasoning not returned
  | 'interleaved'; // Minimax: reasoning interleaved with response

/** Effort-based reasoning config (OpenAI, DeepSeek) */
export interface ReasoningConfigEffort {
  style: 'effort';
  values: EffortLevel[];
  default: EffortLevel;
}

/** Budget-based reasoning config (Anthropic, Google Gemini 2.5) */
export interface ReasoningConfigBudget {
  style: 'budget';
  min: number;
  max: number;
  default: number; // -1 for dynamic
  can_disable?: boolean;
}

/** Level-based reasoning config (Google Gemini 3) */
export interface ReasoningConfigLevel {
  style: 'level';
  values: ThinkingLevel[];
  default: ThinkingLevel;
  can_disable?: boolean;
}

/** Toggle-based reasoning config (DeepSeek) */
export interface ReasoningConfigToggle {
  style: 'toggle';
  default: boolean;
}

/** Toggle + budget reasoning config (Cohere, Alibaba) */
export interface ReasoningConfigToggleBudget {
  style: 'toggle_budget';
  default: boolean;
  min?: number;
  max?: number;
  defaultBudget?: number;
}

/** Hybrid reasoning config (Alibaba Qwen) */
export interface ReasoningConfigHybrid {
  style: 'hybrid';
  default: boolean;
  min?: number;
  max?: number;
  defaultBudget?: number;
}

/** Interleaved reasoning config (Minimax) */
export interface ReasoningConfigInterleaved {
  style: 'interleaved';
  default: boolean;
  outputFormats?: ReasoningOutputFormat[];
}

/** Transparent reasoning config (Mistral) */
export interface ReasoningConfigTransparent {
  style: 'transparent';
  default: boolean;
}

/** No reasoning support */
export interface ReasoningConfigNone {
  style: 'none';
}

/** Union of all reasoning config types */
export type ReasoningConfig =
  | ReasoningConfigEffort
  | ReasoningConfigBudget
  | ReasoningConfigLevel
  | ReasoningConfigToggle
  | ReasoningConfigToggleBudget
  | ReasoningConfigHybrid
  | ReasoningConfigInterleaved
  | ReasoningConfigTransparent
  | ReasoningConfigNone;

/**
 * Unified reasoning override that works across ALL providers.
 * Silkboard maps this to provider-specific providerOptions.
 * 
 * @example
 * ```typescript
 * // Anthropic - budget-based
 * await silk.streamText({ reasoning: { budget: 16000 } });
 * 
 * // OpenAI - effort-based
 * await silk.streamText({ reasoning: { effort: 'high', summary: 'detailed' } });
 * 
 * // Alibaba - hybrid (toggle + budget)
 * await silk.streamText({ reasoning: { enabled: true, budget: 8000 } });
 * 
 * // DeepSeek - toggle
 * await silk.streamText({ reasoning: { enabled: true } });
 * ```
 */
export interface ReasoningOverride {
  /** Effort level (OpenAI, xAI, Groq) */
  effort?: EffortLevel;
  
  /** Token budget (Anthropic, Google 2.5, Cohere, Alibaba) */
  budget?: number;
  
  /** Thinking level (Google Gemini 3+) */
  level?: ThinkingLevel;
  
  /** Enable/disable reasoning (DeepSeek, Cohere, Alibaba, Minimax, Mistral) */
  enabled?: boolean;
  
  /** Output format (Groq, Minimax) */
  outputFormat?: ReasoningOutputFormat;
  
  /** Reasoning summary style (OpenAI) */
  summary?: 'auto' | 'detailed';
  
  /** Include thoughts in output (Google) */
  includeThoughts?: boolean;
}
