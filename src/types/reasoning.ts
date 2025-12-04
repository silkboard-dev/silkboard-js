/**
 * Reasoning/thinking configuration types for different providers.
 */

/** Reasoning implementation style */
export type ReasoningStyle = 'effort' | 'budget' | 'level' | 'toggle' | 'none';

/** Effort levels for OpenAI-style reasoning */
export type EffortLevel = 'low' | 'medium' | 'high' | 'minimal' | 'none';

/** Thinking levels for Google Gemini 3 */
export type ThinkingLevel = 'low' | 'high';

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

/** Toggle-based reasoning config */
export interface ReasoningConfigToggle {
  style: 'toggle';
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
  | ReasoningConfigNone;

/** Runtime reasoning override options */
export interface ReasoningOverride {
  effort?: EffortLevel;
  budget?: number;
  level?: ThinkingLevel;
  enabled?: boolean;
}
