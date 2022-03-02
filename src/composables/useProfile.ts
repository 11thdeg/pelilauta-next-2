import { Profile } from '@11thdeg/skaldstore'
import { onSnapshot, getFirestore, doc } from '@firebase/firestore'
import { computed, ref } from 'vue'

let activeUid = ''
let unsubsribe:CallableFunction|undefined = undefined
const activeProfile = ref<Profile|undefined>(undefined)

function subscribe(uid: string) {
  if (uid === activeUid) // Return, already subscribed
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
      } else {
        activeProfile.value = undefined
      }
    }
  )
}

export function useProfile (uid?: string) {
  if (uid) subscribe(uid)
  return {
    profile: computed(() => activeProfile.value)
  }
}