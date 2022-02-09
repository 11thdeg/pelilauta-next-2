import { Profile } from '@11thdeg/skaldstore'
import { doc, getFirestore, getDoc } from '@firebase/firestore'
import { computed } from 'vue'

const profileCache = new Map<string, Profile>()

async function fetchProfile (uid: string): Promise<Profile> {
  const cached = profileCache.get(uid)
  if (cached) return cached

  const authorDoc = await getDoc(
    doc(
      getFirestore(),
      'profiles',
      uid
    )
  )

  if (authorDoc.exists()) {
    const ac = new Profile(authorDoc.data(), uid)
    profileCache.set(uid, ac)
    return ac
  }

  return new Profile()
}

export const useProfiles = () => {
  return {
    cache: computed(() => profileCache),
    fetchProfile
  }
}