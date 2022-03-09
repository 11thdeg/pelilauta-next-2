import { Account } from '@11thdeg/skaldstore'
import { computed, ref } from 'vue'
import type { DocumentData } from '@firebase/firestore'
import { logDebug } from '../utils/loghelpers'
import { useStore } from '../stores/main'

const activeAccount = ref(new Account(null))
const account = computed(() => activeAccount.value)

function setAccountData(data: DocumentData|null) {
  logDebug('setAccountData', data)
  activeAccount.value = new Account(data)
}

const showAdminTools = computed(() => {
  const meta = useStore()
  return meta.admins.includes(account.value.uid)
})

function useAccount () {
  return {
    setAccountData,
    showAdminTools,
    account,
    anonymous: computed(() => !account.value.uid)
  }
}

export {
  useAccount
}