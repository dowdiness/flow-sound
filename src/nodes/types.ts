import type { Node, BuiltInNode } from '@xyflow/react';

export type OscNode = Node<{ frequency: number, type: string }, 'osc'>;
export type AmpNode = Node<{ gain: number }, 'amp'>;
export type OutNode = Node<{ on: string, off: string }, 'out'>;
export type AppNode =
  BuiltInNode
  | OscNode
  | AmpNode
  | OutNode;
