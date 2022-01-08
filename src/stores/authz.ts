import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User } from 'firebase/auth'

const _STATE_INITIAL = 0
const _STATE_FIREBASE_ACTIVE = 1
const _STATE_LOGIN_COMPLETE = 2
const _STATE_FIRESTORE_ACTIVE = 3

export const useAuthz = defineStore('session', () => {
  const state = ref(_STATE_INITIAL)

  function firebaseInitialized() {
    if (state.value > _STATE_FIREBASE_ACTIVE) return
    state.value = _STATE_FIREBASE_ACTIVE
  }

  function loginAs(user: User | null) {
    if (state.value < _STATE_LOGIN_COMPLETE) state.value = _STATE_LOGIN_COMPLETE
  }

  function firestoreInitialized() {
    state.value = _STATE_FIRESTORE_ACTIVE
  }

  return {
    init: computed(() => state.value >= _STATE_FIREBASE_ACTIVE),
    active: computed(() => state.value >= _STATE_LOGIN_COMPLETE),
    operational: computed(() => state.value >= _STATE_FIRESTORE_ACTIVE),
    firebaseInitialized,
    loginAs,
    firestoreInitialized
  }
})