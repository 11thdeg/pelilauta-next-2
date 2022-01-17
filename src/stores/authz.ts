import { defineStore } from 'pinia'
import { computed, reactive } from 'vue'
import type { User } from 'firebase/auth'
import { Account } from '../skaldstore/dist'
import { doc, getFirestore, updateDoc, getDoc, setDoc, onSnapshot } from '@firebase/firestore'
import { logDebug } from '../utils/loghelpers'
import { useProfile } from './profile'

export const useAuthz = defineStore('session', () => {
  const state = reactive({
    initialized: false,
    operational: false,
    user: new Account(null)
  })

  let unsubscribeToAccount:CallableFunction|undefined

  async function synchronizeAccountData () {
    const accountDoc = doc(getFirestore(), 'account', state.user.uid)
    const accountData = await (await getDoc(accountDoc)).data()
    logDebug('synchronizeAccountData', accountData)
    if (accountData) {
      state.user.docData = accountData
      logDebug('synchronizeAccountData', 'updating', state.user.docData)
      await updateDoc(accountDoc, state.user.docData)
    } 
    else {
      logDebug('synchronizeAccountData', 'creating', state.user.docData)
      const data = state.user.docData
      data.uid = state.user.uid
      await setDoc(accountDoc, data)
    }
    unsubscribeToAccount = onSnapshot(accountDoc, async (snapshot) => {
      logDebug('synchronizeAccountData', 'snapshot', snapshot.data())
      if (snapshot.exists()) {
        state.user.docData = snapshot.data()
      }
    })
    const { initialize: initProfile } = useProfile()
    initProfile(state.user.uid)
  }

  async function loginAs(user: User | null) {
    state.initialized = false
    unsubscribeToAccount && unsubscribeToAccount()
    state.user = new Account(user)
    if (user !== null) {
      await synchronizeAccountData()
      state.operational = true
    }
    state.initialized = true
    logDebug('App initialized as', user?.displayName || 'anonymous')
  }

  async function setLightMode(mode: string) {
    if (state.user.lightMode === mode) return
    logDebug('setLightMode', mode)
    const accountDoc = doc(getFirestore(), 'account', state.user.uid)
    updateDoc(accountDoc, { lightMode: mode })
  }

  async function setLocale (locale: string) {
    if (state.user.locale === locale) return
    if (!state.user.isAnonymous) {
      logDebug('Updating account.locale', locale)
      const accountDoc = doc(getFirestore(), 'account', state.user.uid)
      updateDoc(accountDoc, { locale: locale })
    }
  }

  function loginAsAnonymous () {
    state.operational = true
  }

  function $reset () {
    state.initialized = false
    state.operational = false
    state.user = new Account(null)
  }

  return {
    initialized: computed(() => state.initialized),
    anonymous: computed(() => state.initialized && state.user.isAnonymous),
    operational: computed(() => state.initialized && state.operational),
    loginAs,
    user: computed(() => state.user),
    setLightMode,
    setLocale,
    loginAsAnonymous,
    $reset
  }
})
