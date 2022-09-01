import { Account } from '@11thdeg/skaldstore'
import { computed, Ref, ref } from 'vue'
import { onSnapshot, getFirestore, doc } from '@firebase/firestore'
import { useStore } from '../stores/main'
import { logDebug } from '../utils/loghelpers'

const activeUid:Ref<string|undefined> = ref('')
const activeAccount = ref(new Account(null))
const account = computed(() => activeAccount.value)

const showAdminTools = computed(() => {
  const meta = useStore()
  return meta.admins.includes(account.value.uid)
})

let unSubscribeToAccountData:undefined|CallableFunction

async function subscribeToAccountData(uid?:string) {
  if (unSubscribeToAccountData) unSubscribeToAccountData()
  if (!uid) return
  unSubscribeToAccountData = await onSnapshot(
    doc(getFirestore(), 'account', uid),
    (snapshot) => {
      if (snapshot.exists()) {
        activeAccount.value = new Account(snapshot.data())
      }
    }
  )
}

export function useAccount (uid?: string) {
  if (uid && uid !== activeUid.value) {
    logDebug('!!! useAccount', 'uid changed', uid)
    activeUid.value = uid
    activeAccount.value = new Account(null)
    subscribeToAccountData(uid)
  }
  return {
    showAdminTools,
    account,
    anonymous: computed(() => !account.value.uid)
  }
}
