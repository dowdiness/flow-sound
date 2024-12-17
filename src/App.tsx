import { useRef, useEffect } from 'react'
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
import { Layout } from '@/components/layouts/layout'

import { initAudioOnFirstClick } from '@/audio/context'

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
  const buttonRef = useRef<HTMLButtonElement>(null)
  const store = useFlowStore(selector)

  useEffect(() => {
    if (buttonRef.current) {
      initAudioOnFirstClick(buttonRef.current).catch((error) => {
        console.error(`Audio initialization error ${error}`)
      })
    }
  }, [])

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
      )}}
      sub={(setIsClicked) => {
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
