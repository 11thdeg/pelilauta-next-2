import { computed, ref } from 'vue'
import { getFirestore, doc, onSnapshot } from '@firebase/firestore'

interface StreamData {
      slug: string
      name: string,
      icon: string
      count: number
      order: number
    }
const streams = ref<StreamData[]>([])


let unsubscribeAppMeta: CallableFunction|undefined = undefined
async function initAppMeta() {
  if(unsubscribeAppMeta) return
    const metaRef = doc(getFirestore(), 'meta', 'pelilauta')
    unsubscribeAppMeta = await onSnapshot(metaRef, (metaDoc) => {
        const s = new Array<StreamData>()
    for (const key in metaDoc.data()?.streams) {
       if(key === '-') continue // skip the '-' key as it's reserved for unassigned streams
      s.push({
        slug: key,
        name: metaDoc.data()?.streams[key]?.name || key,
        icon: metaDoc.data()?.streams[key]?.icon || 'none',
        count: metaDoc.data()?.streams[key]?.count || 0,
        order: metaDoc.data()?.streams[key]?.order || 0
      })
    }
    streams.value = s.sort((a, b) => {
      if (a.order === b.order) return a.name > b.name ? 1 : -1
      return a.order > b.order ? 1 : -1
    })
})
  
}

export function useMeta () {
  initAppMeta()
  return {
    streams: computed(() => streams.value)
  }
}