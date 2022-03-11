import { Notification } from "@11thdeg/skaldstore"
import { collection, getFirestore, onSnapshot, query, where } from "firebase/firestore"
import { computed, ref } from "vue"
import { useAccount } from "./useAccount"

const notifications = ref<Notification[]>([])
const newNotificationsCount = computed(() => notifications.value.filter((notification) => !notification.read).length)

let uid = ''
let unsSubscribe:CallableFunction|undefined = undefined

async function init () {
  const { account } = useAccount()
  if (account.value.uid === uid) return
  else {
    uid = account.value.uid
    if (unsSubscribe) unsSubscribe()
    unsSubscribe = await onSnapshot(
      query(
        collection(
          getFirestore(),
          'notifications'
        ),
        where('to', '==', uid)
      ),
      (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === 'removed') {
            notifications.value = notifications.value.filter((notification) => notification.key !== change.doc.id)
          }
          else {
            notifications.value.push(new Notification(change.doc.data(), change.doc.id))
          }
        }
      )
    })
  }
}

export function useNotifications () {
  init()
  return {
    notifications,
    newNotificationsCount
  }
}