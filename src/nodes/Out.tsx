import { Handle, Position, type NodeProps } from '@xyflow/react';
import { shallow } from 'zustand/shallow';

import { useFlowStore } from '@/store/soundStore';
import { type OutNode } from './types';

// @ts-expect-error unknonw
const selector = (store) => {
  return {
    isRunning: store.isRunning,
    toggleAudio: store.toggleAudio
  }
}

export function Out({ id: _id, data }: NodeProps<OutNode>) {
  const { isRunning, toggleAudio } = useFlowStore(selector, shallow)

  return (
    <div className="react-flow__node-default">
      <Handle type="target" position={Position.Top} />

      <div>
        <p className="font-bold">Output Node</p>

        <button className='nodrag' onClick={toggleAudio}>
          {isRunning ? (
            <span role="img" aria-label="mute">
              {data.on}
            </span>
          ) : (
            <span role="img" aria-label="unmute">
              {data.off}
            </span>
          )}
        </button>
      </div>
    </div>
  )
}
