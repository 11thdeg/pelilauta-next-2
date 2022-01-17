import { computed, ref, Ref } from 'vue'
import { defineStore } from 'pinia'
import { getFirestore, doc, getDoc } from '@firebase/firestore'
import { useAuthz } from './authz'
import { useProfile } from './profile'

interface topic {
  slug: string
  name: string
  description: string
  icon: string
  count: number,
  order: number
}

// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
export const useStore = defineStore('main', () => {
  const topics: Ref<topic[]> = ref([])


  async function initAppMeta() {
    const metaRef = doc(getFirestore(), 'meta', 'pelilauta')

    try {
      const metaDoc = await getDoc(metaRef)
      topics.value = metaDoc.data()?.topics || []

    } catch (e) {
      console.error(e)
    }
  }

  function $reset () {
    topics.value = []
    const authz = useAuthz()
    authz.$reset()
    const profile = useProfile()
    profile.$reset()
  }

  return {
    topics: computed(() => topics.value), // Read only
    initAppMeta,
    $reset
  }
})
