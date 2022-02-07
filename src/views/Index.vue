<template>
  <TopAppBar />
  <main class="bookLayout">
    <Column class="double-cut streamcards">
      <ThreadCard
        v-for="thread in threads"
        :key="thread.key"
        :thread="thread"
      />
    </Column>
  </main>
  <FabTray>
    <Fab
      icon="mekanismi"
      label="New Thread"
      @click.prevent="$router.push('/create/thread')" 
    />
  </FabTray>
</template>

<script lang="ts" setup>
import { computed, onMounted } from 'vue'
import TopAppBar from '../components/navigation/TopAppBar.vue'
import { useStream } from '../stores/stream'
import FabTray from '../components/navigation/FabTray.vue'
import Fab from '../components/ui/Fab.vue'
import ThreadCard from '../components/threads/ThreadCard.vue'
import Column from '../components/ui/Column.vue'


const stream = useStream()
const threads = computed(() => {
  const arr = Array.from(stream.threads.values())
  arr.sort((a, b) => a.compareFlowTime(b))
  return arr
})

onMounted(() => {
  stream.subscribe()
})

</script>

<style lang="sass" scoped>
.streamcards
  display: flex
  flex-direction: column
  gap: 8px
</style>
