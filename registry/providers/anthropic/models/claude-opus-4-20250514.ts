import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';
import { withAnthropicDefaults } from '../_defaults';

const claude_opus_4_20250514: ModelDefinition = withAnthropicDefaults(defineModel({
  id: 'claude-opus-4-20250514',
  name: 'Claude Opus 4',
  type: 'chat',
  family: 'claude-4',
  status: 'ga',
  contextWindow: { input: 0 }, // TODO: Verify context window limits
  modalities: { input: { text: true, image: true }, output: { text: true } },
  pricing: { standard: { input: 0, output: 0 } }, // TODO: Verify pricing
  capabilities: {},
  features: {},
}));

export default claude_opus_4_20250514;
