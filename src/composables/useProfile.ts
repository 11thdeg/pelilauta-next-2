import { Profile } from '@11thdeg/skaldstore'
import { onSnapshot, getFirestore, doc, updateDoc } from '@firebase/firestore'
import { computed, ref } from 'vue'
import { logDebug } from '../utils/loghelpers'

let activeUid = ''
let unsubsribe:CallableFunction|undefined = undefined
const activeProfile = ref<Profile|undefined>(undefined)

function subscribe(uid: string) {
  if (uid === activeUid) return // Return, already subscribed
  activeUid = uid
  if (unsubsribe) unsubsribe()
  unsubsribe = onSnapshot(
    doc(
      getFirestore(),
      'profiles',
      uid
    ),
    (profileDoc) => {
      if (profileDoc.exists()) {
        activeProfile.value = new Profile(profileDoc.data(), uid)
        logDebug('Profile', 'subscribed', uid, activeProfile.value.docData)
      } else {
        activeProfile.value = undefined
      }
    }
  )
}

async function watchThreadAt (key: string, at: number) {
  if (!activeUid) return
  const watched:{[key: string]: number} = activeProfile.value?.docData?.watchThreads || {}
  watched[key] = at
  logDebug('Profile', 'watchThreadAt', key, at, watched)
  return updateDoc(
    doc(
      getFirestore(),
      'profiles',
      activeUid
    ),
    { watchThreads: watched }
  )
}

async function unwatchThreadAt (key: string) {
  if (!activeUid) return
  const watched:{[key: string]: number} = activeProfile.value?.docData?.watchThreads || {}
  delete watched[key]
  return updateDoc(
    doc(
      getFirestore(),
      'profiles',
      activeUid
    ),
    { watchThreads: watched }
  )
}

export function useProfile (uid?: string) {
  if (uid) subscribe(uid)
  return {
    profile: computed(() => activeProfile.value),
    watchThreadAt,
    unwatchThreadAt
  }
}