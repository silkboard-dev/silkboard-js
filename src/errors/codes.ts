export enum SilkboardErrorCode {
  // Configuration errors
  CONFIG_NOT_FOUND = 'CONFIG_NOT_FOUND',
  CONFIG_INVALID = 'CONFIG_INVALID',
  ROLE_NOT_FOUND = 'ROLE_NOT_FOUND',
  MODEL_NOT_FOUND = 'MODEL_NOT_FOUND',
  
  // Provider errors
  PROVIDER_NOT_AVAILABLE = 'PROVIDER_NOT_AVAILABLE',
  PROVIDER_INIT_FAILED = 'PROVIDER_INIT_FAILED',
  API_KEY_MISSING = 'API_KEY_MISSING',
  
  // Model errors
  MODEL_TYPE_MISMATCH = 'MODEL_TYPE_MISMATCH',
  MODEL_CREATION_FAILED = 'MODEL_CREATION_FAILED',
  REASONING_CONFIG_INVALID = 'REASONING_CONFIG_INVALID',
  
  // Request errors
  REQUEST_INVALID = 'REQUEST_INVALID',
  REQUEST_FAILED = 'REQUEST_FAILED',
  RATE_LIMIT_EXCEEDED = 'RATE_LIMIT_EXCEEDED',
  
  // Cache errors
  CACHE_ERROR = 'CACHE_ERROR',
  CACHE_MISS = 'CACHE_MISS',
  
  // Cost tracking errors
  COST_TRACKING_FAILED = 'COST_TRACKING_FAILED',
  PRICING_DATA_MISSING = 'PRICING_DATA_MISSING',
  
  // Internal errors
  INTERNAL_ERROR = 'INTERNAL_ERROR',
  TIMEOUT = 'TIMEOUT',
  NETWORK_ERROR = 'NETWORK_ERROR',
}

export const ERROR_MESSAGES: Record<SilkboardErrorCode, string> = {
  [SilkboardErrorCode.CONFIG_NOT_FOUND]: 'Configuration file not found',
  [SilkboardErrorCode.CONFIG_INVALID]: 'Configuration file is invalid',
  [SilkboardErrorCode.ROLE_NOT_FOUND]: 'Role configuration not found',
  [SilkboardErrorCode.MODEL_NOT_FOUND]: 'Model configuration not found',
  
  [SilkboardErrorCode.PROVIDER_NOT_AVAILABLE]: 'Provider is not available',
  [SilkboardErrorCode.PROVIDER_INIT_FAILED]: 'Failed to initialize provider',
  [SilkboardErrorCode.API_KEY_MISSING]: 'API key is missing',
  
  [SilkboardErrorCode.MODEL_TYPE_MISMATCH]: 'Model type does not match request type',
  [SilkboardErrorCode.MODEL_CREATION_FAILED]: 'Failed to create model instance',
  [SilkboardErrorCode.REASONING_CONFIG_INVALID]: 'Reasoning configuration is invalid',
  
  [SilkboardErrorCode.REQUEST_INVALID]: 'Request parameters are invalid',
  [SilkboardErrorCode.REQUEST_FAILED]: 'Request failed',
  [SilkboardErrorCode.RATE_LIMIT_EXCEEDED]: 'Rate limit exceeded',
  
  [SilkboardErrorCode.CACHE_ERROR]: 'Cache operation failed',
  [SilkboardErrorCode.CACHE_MISS]: 'Cache miss',
  
  [SilkboardErrorCode.COST_TRACKING_FAILED]: 'Cost tracking failed',
  [SilkboardErrorCode.PRICING_DATA_MISSING]: 'Pricing data not available',
  
  [SilkboardErrorCode.INTERNAL_ERROR]: 'Internal server error',
  [SilkboardErrorCode.TIMEOUT]: 'Operation timed out',
  [SilkboardErrorCode.NETWORK_ERROR]: 'Network error occurred',
};
