import type {
  OnNodesChange,
  OnEdgesChange,
  Node,
  Edge
} from '@xyflow/react';
import { applyNodeChanges, applyEdgeChanges } from '@xyflow/react';
import { nanoid } from 'nanoid';
import { createWithEqualityFn } from 'zustand/traditional';

import { type AppNode } from '@/nodes/types';

import {
  createAudioNode,
  updateAudioNode,
  removeAudioNode,
  connect,
  isRunning,
  toggleAudio
} from '@/audio';

type FlowStoreState = {
  nodes: Node[],
  edges: Edge[],
  isRunning: boolean,
}

type FlowStoreActions = {
  onNodesChange: OnNodesChange,
  onEdgesChange: OnEdgesChange,
  toggleAudio: () => void,
}
type FlowStore = FlowStoreState & FlowStoreActions

export const nodes: AppNode[] = [
  { type: 'osc', id: 'osc', data: { frequency: 440, type: 'square' }, position: { x: 0, y: -150 }},
  {
    id: "amp",
    type: "amp",
    data: { gain: 0.5 },
    position: { x: 0, y: 0 },
  },
  { type: 'out', id: 'output', data: { on: '🔈', off:' 🔇'}, position: { x: 0, y: 150 }}

]

export const edges = [
  { id: "osc->amp", source: "osc", target: "amp" },
  { id: "amp->out", source: "amp", target: "output" },
]

export const useFlowStore = createWithEqualityFn<FlowStore>((set, get) => ({
  nodes,
  edges,
  isRunning: isRunning(),

  onNodesChange(changes) {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },

  onEdgesChange(changes) {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },

  toggleAudio() {
    toggleAudio().then(() => {
      set({ isRunning: isRunning() });
    })
  },

  // @ts-expect-error no data types
  addEdge(data) {
    const id = nanoid(6);
    const edge = { id, ...data };

    set({ edges: [edge, ...get().edges] });
    // connect audio nodes
    connect(data.source, data.target)
  },

  createNode(type: string) {
    const id = nanoid()

    switch(type) {
      case 'osc': {
        const data = { frequency: 440, type: 'sine' } as const
        const position = { x: 0, y: 0 }

        createAudioNode(id, type, data)
        set({ nodes: [...get().nodes, { id, type, data, position }]})
        break
      }

      case 'amp': {
        const data = { gain: 0.5 }
        const position = { x: 0, y: 0 }

        createAudioNode(id, type, data)
        set({ nodes: [...get().nodes, { id, type, data, position }]})
        break
      }

      case 'analyser': {
        const data = {
          fftSize: 2048,
          minDecibels: -90,
          maxDecibels: -10,
          smoothingTimeConstant: 0.85
        }
        const position = { x: 0, y: 0 }
        createAudioNode(id, type, data)
        set({ nodes: [...get().nodes, { id, type, data, position }]})
        break
      }

      case 'mixer': {
        const position = { x: 0, y: 0 }
        const data = {}

        createAudioNode(id, type, data)
        set({ nodes: [...get().nodes, { id, type, data, position }]})
        break
      }
    }
  },

  // @ts-expect-error no data types
  updateNode(id, data) {
    updateAudioNode(id, data)
    set({
      nodes: get().nodes.map(node => {
        return node.id === id
          ? { ...node, data: { ...node.data, ...data }}
          : node
      })
    })
  },

  removeNodes(nodes: AppNode[]) {
    for (const { id } of nodes) {
      removeAudioNode(id)
    }
  }
}));
