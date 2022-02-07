<script lang="ts" setup>
import { Thread } from '@11thdeg/skaldstore'
import { computed, onMounted, ref } from 'vue'
import { useThreads } from '../../composables/useThreads';
import TopAppBar from '../../components/navigation/TopAppBar.vue';
import MarkDownSection from '../../components/ui/MarkDownSection.vue';

const { fetchThread } = useThreads()

const props = defineProps<{
  threadid: string
}>()

const thread = ref<Thread|undefined>(undefined)
const title = computed(() => thread.value ? thread.value.title : '...')


onMounted(async ()  => {
  thread.value = await fetchThread(props.threadid)
})
</script>

<template>
  <TopAppBar
    :title="title"
  />
  <main class="singleColumnLayout">
    <template v-if="thread">
      <MarkDownSection v-if="thread.markdownContent" :content="thread.markdownContent" />
      <div v-else :innerHTML="thread.htmlContent" />
    </template>
    <hr>
    {{ thread }}
  </main>
</template>