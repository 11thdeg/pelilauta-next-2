import { computed, ref, Ref } from 'vue'
import { defineStore } from 'pinia'
import { getFirestore, doc, getDoc } from '@firebase/firestore'
import { useAuthz } from './authz'
import { useProfile } from './profile'

interface topic {
  slug: string
  title: string
  description: string
  icon: string
  count: number,
  order: number
}

interface streams {
  [key: string]: {
    slug: string
    name: string,
    icon: string
    count: number
    order: number
  }
}

// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
export const useStore = defineStore('main', () => {
  const withFabs = ref(false)
  const withTray = ref(false)
  const showTrayOnMobile = ref(false)

  const topics: Ref<topic[]> = ref([])
  const streams = ref<streams>({})
  const admins = ref<string[]>([])


  async function initAppMeta() {
    const metaRef = doc(getFirestore(), 'meta', 'pelilauta')

    try {
      const metaDoc = await getDoc(metaRef)
      topics.value = metaDoc.data()?.topics || []
      streams.value = metaDoc.data()?.streams || {}
      admins.value = metaDoc.data()?.admins || []
    } catch (e) {
      console.error(e)
    }
  }

  function $reset () {
    topics.value = []
    streams.value = {}
    const authz = useAuthz()
    authz.$reset()
    const profile = useProfile()
    profile.$reset()
  }

  function mountFabs () {
    withFabs.value = true
  }

  function unmountFabs () {
    withFabs.value = false
  }

  function mountTray () {
    withTray.value = true
  }

  function unmountTray () {
    withTray.value = false
  }

  function toggleMobileTray () {
    showTrayOnMobile.value = !showTrayOnMobile.value
  }

  return {
    topics: computed(() => topics.value), // Read only
    streams: computed(() => streams.value), // Read only
    withFabs: computed(() => withFabs.value), // Read only
    withTray: computed(() => withTray.value), // Read only
    admins: computed(() => admins.value), // Read only
    showTrayOnMobile: computed(() => showTrayOnMobile.value), // Read only
    initAppMeta,
    $reset,
    mountFabs,
    unmountFabs,
    mountTray,
    unmountTray,
    toggleMobileTray
  }
})
