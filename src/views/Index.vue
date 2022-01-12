<template>
  <TopAppBar />
  <main class="bookLayout">
    <div>{{ topics }}</div>
  </main>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useStore } from '../stores/main'
import TopAppBar from '../components/navigation/TopAppBar.vue'

const store = useStore()
const topics = computed(() => store.topics)

</script>