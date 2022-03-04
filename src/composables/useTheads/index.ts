import { Thread } from '@11thdeg/skaldstore'
import { doc, getDoc, getFirestore } from '@firebase/firestore'
import { useStream } from "../../stores/stream"
import { logDebug, logError } from "../../utils/loghelpers"
import { loveThread, unLoveThread } from './reations'

const threadCache = new Map<string, Thread>()

async function fetchThread (id: string):Promise<Thread|undefined> {
  logDebug('fetchThread', id)
  const stream = useStream()

  // Lets see if it has been updated lately (and is thus available in the stream)
  // Also update the cache, just for the rare case, that the stream gets multiple
  // updates while the app is running
  if (stream.threads.has(id)) {
    const t = stream.threads.get(id)
    if (t) threadCache.set(id, t)
    return t
  }

  // Ok, not, lets see if we have it cached here
  if (threadCache.has(id)) return threadCache.get(id)

  // We need to fetch the thread from the firestore:
  const threadDoc = await getDoc(
    doc(
      getFirestore(),
      'stream',
      id
    )
  )
  if (threadDoc.exists()) {
    const thread = new Thread(threadDoc.data(), threadDoc.id)
    threadCache.set(threadDoc.id, thread)
    return thread
  }

  // Nope: lets log an error, and explicitly return _undefined_
  logError('fetchThread', 'Failed to find thread, maybe your are offine and it\'s not cached by firestore?', id)
  return undefined
}

function useThreads () {
  return {
    fetchThread
  }
}

export {
  loveThread,
  unLoveThread,
  useThreads
}