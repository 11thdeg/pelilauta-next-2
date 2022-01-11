<template>
  <nav>
    <router-link to="/stylebook">
      Stylebook
    </router-link>
  </nav>
  <div>Home ({{ init }})</div>
  <div>{{ topics }}</div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from '../stores/main'

export default defineComponent({
  setup() {
    const store = useStore()
    return {
      init: computed(() => store.initialized),
      topics: computed(() => store.topics)
    }
  }
})
</script>