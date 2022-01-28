import { defineStore } from "pinia"
import { readonly, ref } from "vue"
import { Profile } from "@11thdeg/skaldstore"
import { doc, getFirestore, getDoc, setDoc, onSnapshot, updateDoc } from '@firebase/firestore'
import { getAuth } from "firebase/auth"
import { logDebug } from "../utils/loghelpers"
import { useAuthz } from "./authz"

export const useProfile = defineStore('profile', () => {
  const profile = ref(new Profile())

  async function enroll () {
    const fbUser = await getAuth().currentUser
    if (!fbUser) throw new Error('No user logged in')
    const p = new Profile()
    p.nickname = fbUser.displayName || fbUser.email?.split('@')[0] || 'Anonymous'
    p.avatarURL = fbUser.photoURL || undefined
    const profileRef = doc(getFirestore(), 'profiles', fbUser.uid)
    await setDoc(profileRef, p.docData)
  }

  let unsubscribeToProfile:CallableFunction|undefined

  async function initialize (uid: string) {
    unsubscribeToProfile && unsubscribeToProfile()
    const profileRef = doc(getFirestore(), 'profiles', uid)
    const profileDoc = await getDoc(profileRef)
    if (!profileDoc.exists()) {
      await enroll()
    }
    unsubscribeToProfile = onSnapshot(profileRef, async (snapshot) => {
      logDebug('profile', 'snapshot', snapshot.data())
      if (snapshot.exists()) profile.value = new Profile(snapshot.data())
      logDebug('profile', 'profile', profile.value)
    })
  }

  async function saveToFirebase () {
    if (!profile.value) return
    const { user } = useAuthz()
    logDebug('profile', 'saveToFirebase')
    const data = profile.value.docData
    logDebug('profile', 'saveToFirebase', 'dry data is', data)
    const profileRef = doc(getFirestore(), 'profiles', user.uid)
    logDebug('profile', 'saveToFirebase', 'profileRef set')
    await updateDoc(profileRef, data)
    logDebug('profile', 'saveToFirebase', 'saved')
  }

  async function update (data: Record<string, string>) {
    if (data.nickname) profile.value.nickname = data.nickname
    if (data.avatarURL) profile.value.avatarURL = data.avatarURL
    await saveToFirebase()
  }

  function $reset () {
    unsubscribeToProfile && unsubscribeToProfile()
    profile.value = new Profile()
  }

  return {
    $reset,
    initialize,
    profile: ref(readonly(profile)),
    update
  }
})