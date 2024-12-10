import { type ChangeEvent } from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import { shallow } from 'zustand/shallow';

import { useFlowStore } from '../store/soundStore';
import { type AmpNode } from './types';

// @ts-expect-error unknonw
const selector = (id) => (store) => {
  return {
    setGain: (e: ChangeEvent<HTMLInputElement>) => store.updateNode(id, { gain: +e?.target?.value })
  }
}

export function Amp({ id, data }: NodeProps<AmpNode>) {
  const { setGain } = useFlowStore(selector(id), shallow)

  return (
    <div className="react-flow__node-default">
      <Handle type="target" position={Position.Top} />

      <div>
        <p className="font-bold">Amp Node</p>

        <label>
          <span>Gain</span>
          <input
            className='nodrag'
            type='range'
            min='0'
            max='1'
            step="0.01"
            value={data.gain}
            onChange={setGain}
          />
          <span>{data.gain.toFixed(2)}</span>
        </label>

      </div>

      <Handle type="source" position={Position.Bottom} />
    </div>
  )
}
