<script lang="ts" setup>
import { Thread } from '@11thdeg/skaldstore'
import { computed, onMounted, ref } from 'vue'
import { useThreads } from '../../composables/useThreads';
import TopAppBar from '../../components/navigation/TopAppBar.vue';
import MarkDownSection from '../../components/ui/MarkDownSection.vue';
import ActionBar from '../../components/ui/ActionBar.vue';
import AuthorTag from '../../components/author/AuthorTag.vue';
import SpacerDiv from '../../components/ui/SpacerDiv.vue';
import SinceTag from '../../components/ui/SinceTag.vue';
import TopicTag from '../../components/threads/TopicTag.vue';
import LoveTag from '../../components/threads/LoveTag.vue';
import ThreadMediaViewer from '../../components/threads/ThreadMediaViewer.vue';

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
      <h1>{{thread.title}}</h1>
      <ActionBar>
        <AuthorTag :uid="thread.author" />
        <SpacerDiv />
        <SinceTag :time="thread.createdAt" />
      </ActionBar>
      <ThreadMediaViewer :thread="thread" />
      <ActionBar>
        <TopicTag :slug="thread.topicid" />
        <SpacerDiv />
        <LoveTag :thread="thread" />
      </ActionBar>
      <MarkDownSection
        v-if="thread.markdownContent"
        :content="thread.markdownContent"
      />
      <div
        v-else
        :innerHTML="thread.htmlContent"
      />
    </template>
    <hr>
  </main>
</template>