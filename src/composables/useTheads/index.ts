import { Thread } from '@11thdeg/skaldstore'
import { doc, getDoc, getFirestore, updateDoc, onSnapshot, query, collection, where, orderBy, limit } from '@firebase/firestore'
import { computed, ref } from 'vue'
import { useStream } from "../../stores/stream"
import { logDebug, logError } from "../../utils/loghelpers"
import { loveThread, unLoveThread } from './reations'

const threadCache = ref(new Map<string, Thread>())

const mostDiscussedThreads = computed(() => {
  const threads = Array.from(threadCache.value.values())
  threads.sort((a, b) => b.replyCount - a.replyCount)
  logDebug('mostDiscussedThreads', threads)
  return threads
})

async function fetchThread (id: string):Promise<Thread|undefined> {
  logDebug('fetchThread', id)
  const stream = useStream()

  // Lets see if it has been updated lately (and is thus available in the stream)
  // Also update the cache, just for the rare case, that the stream gets multiple
  // updates while the app is running
  if (stream.threads.has(id)) {
    const t = stream.threads.get(id)
    if (t) threadCache.value.set(id, t)
    return t
  }

  // Ok, not, lets see if we have it cached here
  if (threadCache.value.has(id)) return threadCache.value.get(id)

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
    threadCache.value.set(threadDoc.id, thread)
    return thread
  }

  // Nope: lets log an error, and explicitly return _undefined_
  logError('fetchThread', 'Failed to find thread, maybe your are offine and it\'s not cached by firestore?', id)
  return undefined
}

async function updateThread (thread:Thread) {
  if (!thread.key) throw new Error('updateThread: thread has no key')
  return updateDoc(
    doc(
      getFirestore(),
      'stream',
      thread.key
    ),
    thread.docData
  )
}

let unsubscribeMostDiscussed:CallableFunction|undefined = undefined

async function subscribeMostDiscussedThreads (count=5) {
  const q = query(
    collection(
      getFirestore(),
      'stream'
    ),
    limit(count),
    where('public', '==', true),
    orderBy('replyCount', 'desc')
  )
  unsubscribeMostDiscussed = await onSnapshot(q, (snapshot) => {
    snapshot.docChanges().forEach(change => {
      if (change.type === 'removed') {
        threadCache.value.delete(change.doc.id)
      } else {
        logDebug('subscribeMostDiscussedThreads', change)
        threadCache.value.set(change.doc.id, new Thread(change.doc.data(), change.doc.id))
      }
    })
  })
}
function unsubscribeMostDiscussedThreads () {
  if (unsubscribeMostDiscussed) unsubscribeMostDiscussed()
}

function useThreads () {
  return {
    fetchThread,
    updateThread,
    mostDiscussedThreads,
    subscribeMostDiscussedThreads,
    unsubscribeMostDiscussedThreads
  }
}

export {
  loveThread,
  unLoveThread,
  useThreads
}