import { getAudioContext } from './context'
import { type OutOptions } from '@/nodes/types'

export const audioNodes = new Map<string, AudioNode>();

export function isRunning() {
  return getAudioContext().state === 'running'
}

export function toggleAudio() {
  return isRunning() ? getAudioContext().suspend() : getAudioContext().resume()
}

type nodeOptions =
  | OscillatorOptions
  | GainOptions
  | AnalyserOptions
  | OutOptions

// @ts-expect-error audio
export function createAudioNode(id: string, type: nodeTypes, data: nodeOptions) {
  const context = getAudioContext();

  switch (type) {
    case 'osc': {
      const oscNode = new OscillatorNode(context, data as OscillatorOptions);
      oscNode.start();

      audioNodes.set(id, oscNode);
      break;
    }

    case 'amp': {
      const gainNode = new GainNode(context, data as GainOptions);

      audioNodes.set(id, gainNode);
      break;
    }

    case 'analyser': {
      const analyserNode = new AnalyserNode(context, data as AnalyserOptions);
      const bufferLength = analyserNode.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      analyserNode.getByteTimeDomainData(dataArray);

      audioNodes.set(id, analyserNode);
      break;
    }

    case 'mixer': {
      const mixerNode = new AudioWorkletNode(context, 'mixer-processor');
      audioNodes.set(id, mixerNode);

      break
    }

    case 'out': {
      audioNodes.set(id, context.destination);
      break;
    }
  }
}

// @ts-expect-error audio
export function updateAudioNode(id: string, data) {
  const node = audioNodes.get(id);

  if (!node) return

  for (const [key, val] of Object.entries(data)) {
    // @ts-expect-error no key
    if (node[key] instanceof AudioParam) {
      node
      // @ts-expect-error object
      node[key].value = val;
    } else {
      // @ts-expect-error no key
      node[key] = val;
    }
  }
}

export function removeAudioNode(id: string) {
  const node = audioNodes.get(id);

  node?.disconnect();
  if (node instanceof AudioScheduledSourceNode) node?.stop();
  audioNodes.delete(id);
}

export function connect(sourceId: string, targetId: string) {
  const source = audioNodes.get(sourceId)
  const target = audioNodes.get(targetId)

  if(source && target) {
    source.connect(target)
  }
}

export function disconnect(sourceId: string, targetId: string) {
  const source = audioNodes.get(sourceId)
  const target = audioNodes.get(targetId)

  if(source && target) {
    source.disconnect(target)
  }
}

export function output(sourceId: string) {
  const source = audioNodes.get(sourceId)

  source?.connect(getAudioContext().destination)
}
