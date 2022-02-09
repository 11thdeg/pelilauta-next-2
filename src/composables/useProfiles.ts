import { doc, getFirestore, DocumentData, getDoc } from '@firebase/firestore'
import { computed } from 'vue'

export class PublicProfile {
  readonly uid:string
  readonly nick:string
  readonly avatarURL:string

  constructor (data?:DocumentData, uid?:string) {
    this.uid = uid || ''
    this.nick = data?.nick || ''
    this.avatarURL = data?.avararURL || data?.photoURL || '' //deprecate photoURL in favor of avatarURL
  }

  get exists () {
    return this.uid.length > 0
  }
}

const profileCache = new Map<string, PublicProfile>()

async function fetchProfile (uid: string): Promise<PublicProfile> {
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
    const ac = new PublicProfile(authorDoc.data(), uid)
    profileCache.set(uid, ac)
    return ac
  }

  return new PublicProfile()
}

export const useProfiles = () => {
  return {
    cache: computed(() => profileCache),
    fetchProfile
  }
}