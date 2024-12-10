import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  Panel
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';

import { nodeTypes } from './nodes';
import { edgeTypes } from './edges';

import { useFlowStore } from './store/soundStore';

// @ts-expect-error unknown
const selector = (store) => ({
  nodes: store.nodes,
  edges: store.edges,
  createNode: store.createNode,
  onNodesChange: store.onNodesChange,
  onEdgesChange: store.onEdgesChange,
  onNodesDelete: store.removeNodes,
  addEdge: store.addEdge,
});

export default function App() {
  const store = useFlowStore(selector)

  return (
    <ReactFlow
      nodes={store.nodes}
      nodeTypes={nodeTypes}
      edges={store.edges}
      edgeTypes={edgeTypes}
      onNodesChange={store.onNodesChange}
      onNodesDelete={store.onNodesDelete}
      onEdgesChange={store.onEdgesChange}
      onConnect={store.addEdge}
      fitView
    >
      <Panel position="top-right">
        <button onClick={() => store.createNode('osc')}>osc</button>
        <button onClick={() => store.createNode('amp')}>amp</button>
      </Panel>
      <Background />
      <MiniMap />
      <Controls />
    </ReactFlow>
  );
}
