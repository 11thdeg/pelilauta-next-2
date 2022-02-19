import { Page, Site } from "@11thdeg/skaldstore"
import { useSites } from "./useSites"
import { collection, getFirestore, onSnapshot } from '@firebase/firestore'
import { computed, ref } from "vue"

let pageCache = ref(new Map<string, Page>())
let activeSite:Site|undefined = undefined
let unsubscribe:undefined|CallableFunction = undefined

async function subscribeToSite (siteid:string) {
  if (activeSite?.key === siteid) return // already subscribed
  
  const { fetchSite } = useSites()
  activeSite = await fetchSite(siteid)
  
  if (unsubscribe) unsubscribe()
  const pagesCollectionRef = collection(getFirestore(), 'sites', siteid, 'pages')
  unsubscribe = onSnapshot(
    pagesCollectionRef,
    (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type ===  'removed') {
          pageCache.value.delete(change.doc.id)
        }
        else {
          pageCache.value.set(change.doc.id, new Page(change.doc.data(), change.doc.id))
        }
      })
    }
  )
}

export function usePages (siteid?:string) {
  if (siteid) subscribeToSite(siteid)
  return {
    pages: computed(() => pageCache.value),
    subscribeToSite
  }
}