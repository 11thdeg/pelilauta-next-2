import { defineStore } from 'pinia'
import { computed, reactive, useTransitionState } from 'vue'
import type { User } from 'firebase/auth'

class Account {

  email: string
  displayName: string
  photoURL: string
  uid: string
  isAnonymous: boolean
  providerId: string

  constructor(user: User | null) {
    this.email = user?.email || ''
    this.displayName = user?.displayName || ''
    this.photoURL = user?.photoURL || ''
    this.uid = user?.uid || ''
    user && !user.isAnonymous ? this.isAnonymous = false : this.isAnonymous = true
    this.providerId = user?.providerId || ''
  }
}

export const useAuthz = defineStore('session', () => {
  const state = reactive({
    initialized: false,
    user: new Account(null)
  })

  function loginAs(user: User | null) {
    state.initialized = false
    state.user = new Account(user)
    state.initialized = true
  }

  return {
    initialized: computed(() => state.initialized),
    anonymous: computed(() => state.initialized && state.user.isAnonymous),
    loginAs
  }
})
