import { Site } from "@11thdeg/skaldstore"
import { logDebug, logError } from "../utils/loghelpers"
import { doc, getDoc, getFirestore, onSnapshot, query, where, collection } from "@firebase/firestore"
import { computed } from "vue"

const siteCache = new Map<string, Site>()
let uid = ''
let userSitesSubscription:undefined|CallableFunction = undefined
const userSites:string[] = []

async function subscribeToUserSites(newUid: string) {
  if (uid === newUid) return

  logDebug(`subscribeToUserSites(${uid})`)
  uid = newUid
  if (userSitesSubscription) userSitesSubscription()
  
  userSitesSubscription = onSnapshot(
    query(
      collection(getFirestore(), 'sites'),
      where('owners', 'array-contains', uid)
    ),
    (snapshot) => {
      snapshot.docChanges().forEach((docChange) => {
        logDebug(`subscribeToUserSites(${uid}), docChange: ${docChange.type}, ${docChange.doc.id}`)
        if (docChange.type !== 'removed') {
          const site = new Site(docChange.doc.data(), docChange.doc.id)
          siteCache.set(docChange.doc.id, site)
          userSites.push(docChange.doc.id)
        } else {
          siteCache.delete(docChange.doc.id)
          userSites.splice(userSites.indexOf(docChange.doc.id), 1)
        }
      })
    }
  )
}

async function fetchSite(id: string): Promise<Site> {
  logDebug(`fetchSite(${id})`)

  // Lets see if its available in the cache
  if (siteCache.has(id)) {
    const site = siteCache.get(id)
    if (site) return site
  }
  
  // Ok, not, lets see if it exists in the firestore, and cache it if so
  const siteDoc = await getDoc(
    doc(
      getFirestore(),
      'sites',
      id
    )
  )

  if (siteDoc.exists()) {
    const site = new Site(siteDoc.data(), siteDoc.id)
    siteCache.set(siteDoc.id, site)
    return site
  }

  // Nope: lets log an error, and throw an error
  logError(`fetchSite(${id}), site not found`)
  throw new Error('Site not found')
}

export function useSites () {
  return {
    fetchSite,
    subscribeToUserSites,
    userSites: computed(() => [...userSites])
  }
}