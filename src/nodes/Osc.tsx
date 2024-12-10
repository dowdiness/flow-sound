import { type ChangeEvent } from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import { shallow } from 'zustand/shallow';

import { useFlowStore } from '../store/soundStore';
import { type OscNode } from './types';

// @ts-expect-error unknonw
const selector = (id) => (store) => {
  return {
    setFrequency: (e: ChangeEvent<HTMLInputElement>) => store.updateNode(id, { frequency: e?.target?.value }),
    setType: (e: ChangeEvent<HTMLSelectElement>) => store.updateNode(id, { type: e.target.value })
  }
}

export function Osc({ id, data }: NodeProps<OscNode>) {
  const { setFrequency, setType } = useFlowStore(selector(id), shallow)

  return (
    <div className="react-flow__node-default">
      <div>
        <p className="font-bold">Oscilator Node</p>

        <label>
          <span>Frequency</span>
          <input
            className='nodrag'
            type='range'
            min='10'
            max='1000'
            value={data.frequency}
            onChange={setFrequency}
          />
          <span>{data.frequency}Hz</span>
        </label>

        <label>
          <span>Waveform</span>
          <select className="nodrag" value={data.type} onChange={setType}>
            <option value="sine">sine</option>
            <option value="triangle">triangle</option>
            <option value="sawtooth">sawtooth</option>
            <option value="square">square</option>
          </select>
        </label>
      </div>

      <Handle type="source" position={Position.Bottom} />
    </div>
  )
}
