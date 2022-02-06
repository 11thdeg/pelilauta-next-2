import { Thread } from "@11thdeg/skaldstore"
import { doc, getDoc, getFirestore } from "@firebase/firestore"
import { useStream } from "../stores/stream"
import { logDebug, logError } from "../utils/loghelpers"

const threadCache = new Map<String, Thread>()

async function fetchThread (id: string):Promise<Thread|undefined> {
  logDebug('fetchThread', id)
  const stream = useStream()

  // Lets see if it has been updated lately (and is thus available in the stream)
  if (stream.threads.has(id)) return stream.threads.get(id)

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

export function useThreads () {
  return {
    fetchThread
  }
}