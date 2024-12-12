import type { Node } from '@xyflow/react';

export type OutOptions = { on: string, off: string }

export type OscNode = Node<{ frequency: number, type: OscillatorType }, 'osc'>;
export type AmpNode = Node<{ gain: number }, 'amp'>;
export type OutNode = Node<OutOptions, 'out'>;
export type AnalyserNode = Node;
export type MixerNode = Node;

export type AppNode =
  | OscNode
  | AmpNode
  | OutNode
  | AnalyserNode
  | MixerNode;
