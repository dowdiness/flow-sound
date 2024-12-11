import type { NodeTypes } from '@xyflow/react';

import { Amp } from './Amp';
import { Osc } from './Osc';
import { Out } from './Out';

export const nodeTypes = {
  'amp': Amp,
  'osc': Osc,
  'out': Out,
  // Add any of your custom nodes here!
} satisfies NodeTypes;
