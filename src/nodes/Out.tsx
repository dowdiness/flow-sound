import { Handle, Position, type NodeProps } from '@xyflow/react';
import { shallow } from 'zustand/shallow';

import { useFlowStore } from '../store/soundStore';
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
    <div>
      <Handle type="target" position={Position.Top} />

      <div>
        <p>Output Node</p>

        <button onClick={toggleAudio}>
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
