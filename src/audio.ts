
const context = new AudioContext();
const nodes = new Map();

context.suspend();

const osc = context.createOscillator();
osc.frequency.value = 220;
osc.type = "square";
osc.start();

const amp = context.createGain();
amp.gain.value = 0.5;

osc.connect(amp);
amp.connect(context.destination);

nodes.set("osc", osc);
nodes.set("amp", amp);
nodes.set("output", context.destination);

export function isRunning() {
  return context.state === 'running'
}

export function toggleAudio() {
  return isRunning() ? context.suspend() : context.resume()
}

// @ts-expect-error audio
export function createAudioNode(id: string, type: 'osc' | 'amp', data) {
  switch (type) {
    case 'osc': {
      const node = context.createOscillator();
      node.frequency.value = data.frequency;
      node.type = data.type;
      node.start();

      nodes.set(id, node);
      break;
    }

    case 'amp': {
      const node = context.createGain();
      node.gain.value = data.gain;

      nodes.set(id, node);
      break;
    }
  }
}

// @ts-expect-error audio
export function updateAudioNode(id: string, data) {
  const node = nodes.get(id);

  console.log(node, id, data)

  for (const [key, val] of Object.entries(data)) {
    console.log(key, val)
    if (node[key] instanceof AudioParam) {
      node
      // @ts-expect-error object
      node[key].value = val;
    } else {
      node[key] = val;
    }
  }
}

export function removeAudioNode(id: string) {
  const node = nodes.get(id);

  node.disconnect();
  node.stop?.();

  nodes.delete(id);
}

export function connect(sourceId: string, targetId: string) {
  const source = nodes.get(sourceId)
  const target = nodes.get(targetId)

  source.connect(target)
}

export function disconnect(sourceId: string, targetId: string) {
  const source = nodes.get(sourceId)
  const target = nodes.get(targetId)

  source.disconnect(target)
}
