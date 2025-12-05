import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';
import { withBasetenDefaults } from '../_defaults';

const zai_org_GLM_4_6: ModelDefinition = withBasetenDefaults(defineModel({
  id: 'zai-org/GLM-4.6',
  name: 'GLM 4.6',
  type: 'chat',
  family: 'glm',
  status: 'ga',
  contextWindow: {
    input: 200_000,
  },
  modalities: {
    input: { text: true },
    output: { text: true },
  },
  pricing: {
    standard: {
      input: 0.60,
      output: 2.20,
    },
  },
  capabilities: {},
  features: {},
}));

export default zai_org_GLM_4_6;
