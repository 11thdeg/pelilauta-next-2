import { defineStore } from 'pinia'
import { computed, Ref, ref } from 'vue'
import { Thread } from '@11thdeg/skaldstore'
import { getFirestore, query, where, collection, limit, orderBy, onSnapshot} from '@firebase/firestore'
import { logDebug } from '../utils/loghelpers'

export const useStream = defineStore('stream', () => {
  const threadCache:Ref<Map<string, Thread>> = ref(new Map())

  let fbSubscription:CallableFunction|undefined = undefined

  async function subscribe () {
    logDebug('stream.subscribe')
    if (fbSubscription) { fbSubscription() }
    const q = query(
      collection(
        getFirestore(),
        'stream'
      ),
      limit(11),
      where('public', '==', true),
      orderBy('flowTime', 'desc')
    )
    fbSubscription = await onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach(async (change) => {
        if (change.type === 'removed') {
          threadCache.value.delete(change.doc.id)
        } else {
          threadCache.value.set(change.doc.id, new Thread(change.doc.data(), change.doc.id))
        }
      })
    })
  }

  return {
    threads: computed(() => threadCache.value),
    subscribe
  }
})