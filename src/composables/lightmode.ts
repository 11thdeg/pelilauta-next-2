import { computed } from "vue"

let mode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'

window.matchMedia('(prefers-color-scheme: dark)')
  .addEventListener('change', event => {
    if (event.matches) {
      mode = 'dark'
    } else {
      mode = 'light'
    }
  }
)

export function useLightMode() {
  return computed(() => mode)
}
