import { Page, Site } from "@11thdeg/skaldstore"
import { useSites } from "./useSites"
import { collection, getFirestore, onSnapshot, getDoc, doc, updateDoc, addDoc } from '@firebase/firestore'
import { computed, ref } from "vue"
import { logDebug } from "../utils/loghelpers"

const pageCache = ref(new Map<string, Page>())
let activeSite:Site|undefined = undefined
let unsubscribe:undefined|CallableFunction = undefined

async function subscribeToSite (siteid:string) {
  if (activeSite?.key === siteid) return // already subscribed
  
  const { fetchSite } = useSites()
  activeSite = await fetchSite(siteid)
  
  if (unsubscribe) unsubscribe()
  const pagesCollectionRef = collection(getFirestore(), 'sites', siteid, 'pages')
  unsubscribe = await onSnapshot(
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

async function fetchPage (pageid:string, siteid?:string ): Promise<Page> {
  if (siteid === activeSite?.key) {
    const p = pageCache.value.get(pageid)
    if (p) return p
  }
  if (!siteid && !activeSite) throw new Error('No active site, or site provided')
  const pageDoc = await getDoc(
    doc(
      getFirestore(),
      'sites',
      siteid || activeSite?.key || '',
      'pages',
      pageid
    )
  )
  if (pageDoc) {
    return new Page(pageDoc.data(), pageDoc.id)
  }
  throw new Error('Page not found')
}

async function createPage (page:Page) {
  logDebug('createPage', page)
  if (!activeSite) throw new Error('No active site')
  return addDoc(
    collection(
      getFirestore(),
      'sites',
      activeSite.key || '',
      'pages'
    ),
    page.docData
  )
}
async function updatePage (page:Page) {
  logDebug('updatePage', page)
  if (!activeSite) throw new Error('No active site')
  const pageDoc = await getDoc(
    doc(
      getFirestore(),
      'sites',
      activeSite.key || '',
      'pages',
      page.key || ''
    )
  )
  if (!pageDoc.exists()) throw new Error('Page already exists')
  return updateDoc(
    doc(
      getFirestore(),
      'sites',
      activeSite.key || '',
      'pages',
      page.key || ''
    ),
    page.docData
  )
}

export function usePages (siteid?:string) {
  if (siteid) subscribeToSite(siteid)
  return {
    pages: computed(() => pageCache.value),
    subscribeToSite,
    fetchPage,
    createPage,
    updatePage
  }
}