import { Account } from '@11thdeg/skaldstore'
import { computed, ref } from 'vue'
import type { DocumentData } from '@firebase/firestore'
import { logDebug } from '../utils/loghelpers'

const activeAccount = ref(new Account(null))
const account = computed(() => activeAccount.value)

function setAccountData(data: DocumentData|null) {
  logDebug('setAccountData', data)
  activeAccount.value = new Account(data)
}

function useAccount () {
  return {
    setAccountData,
    account
  }
}

export {
  useAccount
}