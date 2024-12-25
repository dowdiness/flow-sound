import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  Panel,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';

import { nodeTypes } from '@/nodes';
import { edgeTypes } from '@/edges';

import { useFlowStore } from '@/store/soundStore';
import { Button } from '@/components/ui/button'
import { Layout } from '@/components/layouts/layout'

import { usePaneContextMenu } from '@/components/PaneContextMenu'
import { useCallback } from 'react';

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
  const [contextMenu, openContextMenu] = usePaneContextMenu()
  const onPaneContextMenu = useCallback((event: React.MouseEvent | MouseEvent) => {
    event.preventDefault();
    openContextMenu(event.clientX, event.clientY)
  } , [openContextMenu])

  return (
    <Layout
      main={() => {
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
            onPaneContextMenu={onPaneContextMenu}
            fitView
          >
            {contextMenu}
            <Panel position="top-right" className='space-x-2'>
              <Button onClick={() => store.createNode('osc')}>osc</Button>
            </Panel>
            <Background />
            <MiniMap />
            <Controls />
          </ReactFlow>
      )}}
      sub={(setIsClicked, buttonRef) => {
        return (
          <div className={'m-auto h-full w-full flex justify-center items-center'}>
            <Button
              onClick={() => {
                setIsClicked(true)
              }}
              ref={buttonRef}
            >
              Start!
            </Button>
          </div>
        )
      }}
    />
  );
}
