import { Site } from "@11thdeg/skaldstore"
import { doc, getFirestore, onSnapshot } from "firebase/firestore"
import { computed, Ref, ref } from "vue"

let activeKey = ''
let unsubscribeToSite:undefined|CallableFunction
const activeSite:Ref<Site|null> = ref(null)

const pageCategories = computed(() => {
    if (!activeSite.value) return []
    return activeSite.value.pageCategories || []
})

async function subscribeToSite (key: string) {
    if (unsubscribeToSite) unsubscribeToSite()
    unsubscribeToSite = await onSnapshot(
      doc(getFirestore(), 'sites', key),
      (snapshot) => {
        if (snapshot.exists()) {
          activeSite.value = new Site(snapshot.data(), snapshot.id)
        }
    })
}

export function useSite(key?: string) {
  if (key && key !== activeKey) {
    activeKey = key
    activeSite.value = null
    subscribeToSite(key)
  }
  return {
    site: computed(() => activeSite.value || new Site()),
    pageCategories
  }
}