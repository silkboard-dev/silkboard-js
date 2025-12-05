/**
 * dots.ocr (via Chutes)
 *
 * chutes model: rednote-hilab/dots.ocr
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withChutesDefaults } from '../_defaults';

const dots_ocr: ModelDefinition = withChutesDefaults(defineModel({
  id: 'rednote-hilab/dots.ocr',
  name: 'dots.ocr',
  type: 'chat',
  family: 'chutes',
  status: 'ga',
  description: 'dots.ocr model served via Chutes llm gateway.',
  contextWindow: {
    input: 0, // TODO: Verify context window from llm.chutes.ai
  },
  modalities: {
    input: { text: true }, // TODO: Supports image input for OCR
    output: { text: true },
  },
  pricing: {
    standard: {
      input: 0, // TODO: Add pricing from llm.chutes.ai
      output: 0,
    },
  },
  capabilities: {},
  features: {},
  reasoning: {
    supported: false, // TODO: Confirm reasoning support
  },
}));

export default dots_ocr;

