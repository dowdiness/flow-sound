import type { NodeTypes } from '@xyflow/react';

import { PositionLoggerNode } from './PositionLoggerNode';
import { Amp } from './Amp';
import { Osc } from './Osc';
import { Out } from './Out';

export const nodeTypes = {
  'position-logger': PositionLoggerNode,
  'amp': Amp,
  'osc': Osc,
  'out': Out,
  // Add any of your custom nodes here!
} satisfies NodeTypes;
