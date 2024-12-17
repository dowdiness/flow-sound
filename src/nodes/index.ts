import type { NodeTypes } from '@xyflow/react';

import { Amp } from './Amp';
import { Osc } from './Osc';
import { Out } from './Out';
import { Analyser } from './Analyser';
import { Mixer } from './Mixer';
import { Renderer } from './Renderer';

export const nodeTypes = {
  'amp': Amp,
  'osc': Osc,
  'out': Out,
  'analyser': Analyser,
  'mixer': Mixer,
  'renderer': Renderer,
} satisfies NodeTypes;
