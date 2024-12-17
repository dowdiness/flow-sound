import { nodes as initialNodes, edges as initialEdges } from '@/store/soundStore'
import { includes } from '@/lib/utils'
import { audioNodeNames } from './types'
import { createAudioNode, connect } from './index'
import mixerWorkletUrl from '/processor/MixerProcessor.js?url'

let context: AudioContext | undefined;

function setDefaultAudioContext() {
  context = new AudioContext();
  return context;
}

/**
 * Get a warning if you trigger before a user gesture on the page.
 */
export function getAudioContext() {
  if(!context) {
    return setDefaultAudioContext();
  }
  return context;
}

async function initAudio() {
  await getAudioContext().suspend()
  await initAudioWorklet()
  initAudioGraph()
}

let isClicked: Promise<void> | undefined;

/**
 * A click is needed to initialize audio because of the Autoplay Policy.
 * @see {@link https://www.w3.org/TR/autoplay-detection/}
*/
export async function initAudioOnFirstClick(element?: HTMLElement) {
  const el = element ? element : document

  if (!isClicked) {
    isClicked = new Promise<void>((resolve) => {
      el.addEventListener('click', async function listner() {
        el.removeEventListener('click', listner)
        await initAudio()
        resolve()
      })
    })
    return isClicked;
  }
}

export function initAudioGraph() {
  initialNodes.forEach(((node) => {
    if (includes(audioNodeNames, node.type)) {
      createAudioNode(node.id, node.type, node.data)
    }
  }))

  initialEdges.forEach((edge) => {
    connect(edge.source, edge.target)
  })
}

async function initAudioWorklet() {
  if (!context) {
    throw Error('Initiarize AudioWorklet is failed.')
  }

  await context.audioWorklet.addModule(mixerWorkletUrl)
}
