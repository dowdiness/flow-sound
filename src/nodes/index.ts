import type { NodeTypes } from '@xyflow/react';

import { Amp } from './Amp';
import { Osc } from './Osc';
import { Out } from './Out';
import { Analyser } from './Analyser';

export const nodeTypes = {
  'amp': Amp,
  'osc': Osc,
  'out': Out,
  'analyser': Analyser,
  // Add any of your custom nodes here!
} satisfies NodeTypes;
