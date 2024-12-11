import { Handle, Position } from '@xyflow/react';

// hooks
import { useAnalyser } from './useAnalyser'

export function Analyser() {
  const [canvasRef] = useAnalyser()

  return (
    <div className="w-full react-flow__node-default">
      <Handle type="target" position={Position.Top} />

      <div>
        <p className="font-bold">Analyser Node</p>

        <canvas
          ref={canvasRef}
          width="150"
          height="65"
        />
      </div>

      <Handle type="source" position={Position.Bottom} />
    </div>
  )
}
