import { type ChangeEvent } from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import { shallow } from 'zustand/shallow';

import { useFlowStore } from '@/store/soundStore';
import { type OscNode } from './types';
import { KnobFrequency } from '@/components/ui/KnobFrequency'

// @ts-expect-error unknonw
const selector = (id) => (store) => {
  return {
    setFrequency: (newValue: number) => store.updateNode(id, { frequency: newValue }),
    setType: (e: ChangeEvent<HTMLSelectElement>) => store.updateNode(id, { type: e.target.value })
  }
}

export function Osc({ id, data }: NodeProps<OscNode>) {
  const { setFrequency, setType } = useFlowStore(selector(id), shallow)

  return (
    <div className="react-flow__node-default">
      <div className='flex flex-col items-center'>
        <p className="font-bold">Oscilator Node</p>

        <KnobFrequency
          title='Frequency'
          defaultValue={440}
          value={data.frequency}
          onChange={setFrequency}
        />

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
