import { computed, ref } from "vue"
import { useAuthz } from "../stores/authz"

let mode = ref(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')

window.matchMedia('(prefers-color-scheme: dark)')
  .addEventListener('change', event => {
    if (event.matches) {
      mode.value = 'dark'
    } else {
      mode.value = 'light'
    }
  }
)

function toggleMode() {
  const old = mode.value
  mode.value = mode.value === 'light' ? 'dark' : 'light'
  document.body.classList.remove(old + '-theme')
  document.body.classList.add(mode.value + '-theme')

  const { anonymous, setLightMode } = useAuthz()
  if (!anonymous) setLightMode(mode.value)
}

export function useLightMode() {
  return {
    mode: computed(() => mode.value),
    toggleMode
  }
}
