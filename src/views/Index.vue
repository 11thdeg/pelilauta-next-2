<template>
  <div>Home ({{ init }})</div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from '../stores/main'

export default defineComponent({
  setup() {
    const store = useStore()
    return {
      init: computed(() => store.initialized),
    }
  }
})
</script>