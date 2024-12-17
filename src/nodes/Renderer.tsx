import { Handle, Position, type NodeProps } from '@xyflow/react';
import { type RendererNode } from './types';

export function Renderer({ id: _id }: NodeProps<RendererNode>) {
  return (
    <div className="react-flow__node-default">
      <Handle type="target" position={Position.Top} />

      <div>
        <p className="font-bold">Renderer Node</p>
      </div>

      <Handle type="source" position={Position.Bottom} />
    </div>
  )
}
