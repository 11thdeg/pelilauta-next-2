import { computed, ref, Ref } from 'vue'
import { defineStore } from 'pinia'
import type { User } from 'firebase/auth'
import { getFirestore, doc, getDoc } from '@firebase/firestore'
import { useAuthz } from './authz'

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
  const initialized = ref(false)
  const loginState = ref(false)
  const anonymous = ref(false)
  const topics: Ref<topic[]> = ref([])

  const initialize = async (user: User | null) => {
    if (user === null || user.isAnonymous) {
      anonymous.value = true
    } else {
      anonymous.value = false
    }
    loginState.value = true
    await initAppMeta()
    initialized.value = true
  }

  async function initAppMeta() {
    const metaRef = doc(getFirestore(), 'meta', 'pelilauta')

    try {
      const metaDoc = await getDoc(metaRef)
      topics.value = metaDoc.data()?.topics || []

    } catch (e) {
      console.error(e)
    }

    const session = useAuthz()
    session.firestoreInitialized()
  }

  return {
    initialized: computed(() => initialized.value), // Read only
    loginState: computed(() => loginState.value), // Read only
    anonymous: computed(() => anonymous.value), // Read only
    topics: computed(() => topics.value), // Read only
    initialize
  }
})
