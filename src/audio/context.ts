import { nodes as initialNodes, edges as initialEdges } from '@/store/soundStore'
import { includes } from '@/lib/utils'
import { audioNodeNames } from './types'
import { createAudioNode, connect } from './index'
import mixerWorkletUrl from '/processor/MixerProcessor.js?url'
import { githubPath } from '@/lib/utils.ts'
import type WebRenderer from '@elemaudio/web-renderer'

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

export async function initAudioGraph() {
  for (const node of initialNodes) {
    if (includes(audioNodeNames, node.type)) {
      await createAudioNode(node.id, node.type, node.data)
    }
  }

  initialEdges.forEach((edge) => {
    connect(edge.source, edge.target)
  })
}

async function initAudioWorklet(context: AudioContext) {
  await context.audioWorklet.addModule(mixerWorkletUrl)
}


export async function initAudioSamples(context: AudioContext,core: WebRenderer) {
  const res = await fetch(githubPath('github:wilf312/test/master/docs/trumpet1.mp3'));
  const sampleBuffer = await context.decodeAudioData(await res.arrayBuffer());

  core.updateVirtualFileSystem({
    'sample0': [
      sampleBuffer.getChannelData(0),
      sampleBuffer.getChannelData(1),
    ],
  });
}

async function initAudio() {
  const context = getAudioContext()
  try {
    await context.suspend()
    await initAudioWorklet(context)
    await initAudioGraph()
  } catch (error) {
    console.error(`initAudio() error: ${error}`)
  }
}

let isAudioStarted = false
/**
 * A click is needed to initialize audio because of the Autoplay Policy.
 * @see {@link https://www.w3.org/TR/autoplay-detection/}
*/
export async function initAudioOnFirstClick(element?: HTMLElement) {
  const el = element ? element : document

  if (!isAudioStarted) {
    return new Promise<void>((resolve) => {
      el.addEventListener('click', async function listner() {
        el.removeEventListener('click', listner)
        await initAudio()
        resolve()
      })
    }).then(() => {
      isAudioStarted = true
      console.log('Audio initialization complete')
    }).catch((error) => {
      console.error(`Audio initialization by click event error: ${error}`)
    }).finally(() => {
      console.log('Audio ready')
    })
  }
}

export function isRunning() {
  // Don't call getAudioContext() here if audio is not started because of the Autoplay Policy
  return isAudioStarted ? getAudioContext().state === 'running' : false
}

export function toggleAudio() {
  return isRunning() ? getAudioContext().suspend() : getAudioContext().resume()
}
