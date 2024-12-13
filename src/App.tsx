import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  Panel
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';

import { nodeTypes } from '@/nodes';
import { edgeTypes } from '@/edges';

import { useFlowStore } from '@/store/soundStore';
import { Button } from '@/components/ui/button'

// @ts-expect-error unknown
const selector = (store) => ({
  nodes: store.nodes,
  edges: store.edges,
  createNode: store.createNode,
  onNodesChange: store.onNodesChange,
  onEdgesChange: store.onEdgesChange,
  onNodesDelete: store.removeNodes,
  onEdgesDelete: store.disconnectAudioEdges,
  onConnect: store.onConnect,
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
      onEdgesDelete={store.onEdgesDelete}
      onConnect={store.onConnect}
      fitView
    >
      <Panel position="top-right" className='space-x-2'>
        <Button onClick={() => store.createNode('osc')}>osc</Button>
        <Button onClick={() => store.createNode('amp')}>amp</Button>
        <Button onClick={() => store.createNode('analyser')}>analyser</Button>
        <Button onClick={() => store.createNode('mixer')}>mixer</Button>
      </Panel>
      <Background />
      <MiniMap />
      <Controls />
    </ReactFlow>
  );
}
