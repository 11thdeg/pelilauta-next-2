import { Site } from "@11thdeg/skaldstore"
import { logDebug, logError } from "../utils/loghelpers"
import { doc, getDoc, getFirestore, onSnapshot, query, where, collection, addDoc, updateDoc } from "@firebase/firestore"
import { computed, ref } from "vue"

const siteCache = ref(new Map<string, Site>())
let uid = ''
let pid = ''
let userSitesSubscription:undefined|CallableFunction = undefined
let playerSiteSubscription:undefined|CallableFunction = undefined
const userSites = computed(() => {
  const sites:Site[] = []
  siteCache.value.forEach((site) => {
    if (site.owners.includes(uid)) sites.push(site)
  })
  return sites
})
const playerSites = computed(() => {
  const sites:Site[] = []
  siteCache.value.forEach((site) => {
    logDebug(`playerSites (${uid}), site: ${site.key}`)
    if (site.players.includes(uid)) sites.push(site)
  })
  return sites
})

async function subscribeToPlayerSites(newPid: string) {
  if (newPid === pid) return

  logDebug(`subscribeToPlayerSites(${pid})`)
  pid = newPid
  if (playerSiteSubscription) playerSiteSubscription()

  playerSiteSubscription = onSnapshot(
    query(
      collection(getFirestore(), 'sites'),
      where('players', 'array-contains', pid)
    ),
    (snapshot) => {
      snapshot.docChanges().forEach((docChange) => {
        logDebug(`subscribeToPlayerSites(${pid}), docChange: ${docChange.type}, ${docChange.doc.id}`)
        if (docChange.type !== 'removed') {
          const site = new Site(docChange.doc.data(), docChange.doc.id)
          siteCache.value.set(docChange.doc.id, site)
        } else {
          siteCache.value.delete(docChange.doc.id)
        }
      })
    })
}

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
          siteCache.value.set(docChange.doc.id, site)
        } else {
          siteCache.value.delete(docChange.doc.id)
        }
      })
    }
  )
}

async function fetchSite(id: string): Promise<Site> {
  // logDebug(`fetchSite(${id})`)

  // Lets see if its available in the cache
  if (siteCache.value.has(id)) {
    const site = siteCache.value.get(id)
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
    siteCache.value.set(siteDoc.id, site)
    return site
  }

  // Nope: lets log an error, and throw an error
  logError(`fetchSite(${id}), site not found`)
  throw new Error('Site not found')
}

async function createSite (site: Site) {
  logDebug('createSite()', site.name)
  return addDoc(
    collection(getFirestore(), 'sites'),
    site.docData
  )
}

async function updateSite (site: Site) {
  logDebug('updateSite()', site.name)
  return updateDoc(
    doc(
      getFirestore(),
      'sites',
      site.key || ''
    ),
    site.docData
  )
}

export function useSites () {
  return {
    siteCache: computed(() => siteCache.value),
    fetchSite,
    subscribeToUserSites,
    subscribeToPlayerSites,
    userSites,
    playerSites,
    createSite,
    updateSite
  }
}