import { ref } from 'vue'
import { logDebug } from '../utils/loghelpers'

const snackStack = ref(new Array<{ message: string, params?: Record<string, string> }>())

function pushSnack(message: string, params?: Record<string, string>) {
  logDebug("pushSnack", message)
  snackStack.value.push({ message, params })
}

export function useSnack() {
  return { pushSnack, snackStack }
}