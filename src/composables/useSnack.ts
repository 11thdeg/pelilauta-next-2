import { ref } from 'vue'
import { logDebug } from '../utils/loghelpers'

const snackStack = ref(new Array<{ message: string, params?: Record<string, string>, action?: CallableFunction }>())

interface Config {
  params?: Record<string, string>
  action?: CallableFunction
}

function pushSnack(message: string, config?:Config) {
  logDebug("pushSnack", message)
  snackStack.value.push({ message, ...config })
}

export function useSnack() {
  return { pushSnack, snackStack }
}