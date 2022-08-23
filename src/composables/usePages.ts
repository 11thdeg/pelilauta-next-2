import { Page } from "@11thdeg/skaldstore"
import { collection, getFirestore, onSnapshot, getDoc, doc, updateDoc, addDoc } from '@firebase/firestore'
import { computed, ref } from "vue"
import { logDebug } from "../utils/loghelpers"

let activeSiteKey = ''

const pageCache = ref(new Map<string, Page>())

let unsubscribe:undefined|CallableFunction = undefined

async function subscribeToSite (siteid:string) {
  if (unsubscribe) unsubscribe()
  unsubscribe = await onSnapshot(
    collection(getFirestore(), 'sites', siteid, 'pages'),
    (snapshot) => {
      snapshot.docChanges().forEach(change => {
        if (change.type === 'removed') {
          pageCache.value.delete(change.doc.id)
        }
        else {
          pageCache.value.set(change.doc.id, new Page(change.doc.data(), change.doc.id))
        }
      })
  })
}

async function fetchPage (pageid:string, siteid?:string ): Promise<Page> {
  // Throw error if we don't have a siteid or active site key available
  if (!siteid && !activeSiteKey) throw new Error('No active site, or site provided')
  // If we don't have a siteid, try to use the active site
  if (siteid === activeSiteKey ) {
    return pageCache.value.get(pageid) || new Page()
  }
  const pageDoc = await getDoc(
    doc(
      getFirestore(),
      'sites',
      siteid || activeSiteKey || '',
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
  if (activeSiteKey) throw new Error('No active site')
  const pageDoc = await getDoc(
    doc(
      getFirestore(),
      'sites',
      activeSiteKey || '',
      'pages',
      page.key || ''
    )
  )
  if (!pageDoc.exists()) throw new Error('Page already exists')
  return addDoc(
    collection(
      getFirestore(),
      'sites',
      activeSiteKey || '',
      'pages'
    ),
    page.docData
  )
}
async function updatePage (page:Page) {
  logDebug('updatePage', page)
  if (activeSiteKey) throw new Error('No active site')
  return updateDoc(
    doc(
      getFirestore(),
      'sites',
      activeSiteKey || '',
      'pages',
      page.key || ''
    ),
    page.docData
  )
}

export function usePages (siteid?:string) {
  if (siteid && siteid !== activeSiteKey) {
    activeSiteKey = siteid
    pageCache.value = new Map<string, Page>()
    subscribeToSite(siteid)
  }
  if (siteid) subscribeToSite(siteid)
  return {
    pages: computed(() => pageCache.value),
    fetchPage,
    createPage,
    updatePage
  }
}