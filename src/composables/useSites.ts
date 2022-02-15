import { Site } from "@11thdeg/skaldstore"
import { logDebug, logError } from "../utils/loghelpers"
import { doc, getDoc, getFirestore } from "@firebase/firestore"

const siteCache = new Map<string, Site>()

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
    fetchSite
  }
}