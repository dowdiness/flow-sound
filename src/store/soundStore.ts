import type {
  OnNodesChange,
  OnEdgesChange,
  Node,
  NodeChange,
  EdgeChange,
  Edge,
  Connection
} from '@xyflow/react';
import {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges
} from '@xyflow/react';
import { nanoid } from 'nanoid';
import { createWithEqualityFn } from 'zustand/traditional';

import { type AppNode } from '@/nodes/types';
import type { audioNodeTypes } from '@/audio/types';

import {
  createAudioNode,
  updateAudioNode,
  removeAudioNode,
  connect,
  disconnect,
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
  { type: 'osc', id: 'osc', data: { frequency: 440, type: 'square' }, position: { x: 0, y: -200 }},
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

  onNodesChange(changes: NodeChange<AppNode>[]) {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },

  onEdgesChange(changes: EdgeChange[]) {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },

  onConnect(newConnection: Connection) {
    // connect react flow nodes
    set({ edges: addEdge(newConnection, get().edges) });
    // connect audio nodes
    connect(newConnection.source, newConnection.target)
  },

  toggleAudio() {
    toggleAudio().then(() => {
      set({ isRunning: isRunning() });
    })
  },

  // onEdgesDelete
  disconnectAudioEdges(edges: Edge[]) {
    for (const { source, target } of edges) {
      disconnect(source, target)
    }
  },

  createNode(type: audioNodeTypes) {
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

      case 'out': {
        console.error("Can't create out node!")
        break
      }

      case 'renderer': {
        const position = { x: 0, y: 0 }
        const data = {}

        createAudioNode(id, type, data)
        set({ nodes: [...get().nodes, { id, type, data, position }]})
        break
      }

      default: {
        throw Error(type satisfies never)
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

  // onNodesDelete
  removeNodes(nodes: AppNode[]) {
    for (const { id } of nodes) {
      removeAudioNode(id)
    }
  }
}));
