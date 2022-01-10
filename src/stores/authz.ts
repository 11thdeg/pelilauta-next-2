import { defineStore } from 'pinia'
import { computed, reactive, useTransitionState } from 'vue'
import type { User } from 'firebase/auth'
import { Account } from '../skaldstore/dist'

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
