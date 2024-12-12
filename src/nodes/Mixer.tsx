import { Handle, Position } from '@xyflow/react';

export function Mixer() {
  return (
    <div className="react-flow__node-default">
      <Handle type="target" position={Position.Top} />

      <div>
        <p className="font-bold">Mixer Node</p>
      </div>

      <Handle type="source" position={Position.Bottom} />
    </div>
  )
}
