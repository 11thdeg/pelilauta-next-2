<script lang="ts" setup>
import { Thread } from '@11thdeg/skaldstore'
import { computed } from 'vue';
import Card from '../ui/Card.vue';
import MarkDownSection from '../ui/MarkDownSection.vue';
import YoutubePreview from '../ui/YoutubePreview.vue';

const props = defineProps<{
  thread: Thread
}>()

const snippet = computed(() => {
  if (props.thread.markdownContent) return props.thread.markdownContent.slice(0, 240) + '...'
  const div = document.createElement('div')
      div.innerHTML = props.thread.htmlContent
      let snip = ''
      if (div.firstChild) {
        snip = div.firstChild.textContent || ''
        if (snip.length > 140) snip = snip.substring(0, 140) + '...'
      }
      return snip
})
</script>

<template>
  <Card>
    <h1>
      <router-link :to="`/threads/${thread.key}`">
        {{ thread.title }}
      </router-link>
    </h1>
    <template v-if="thread.youtubeId">
      <YoutubePreview
        :video-id="thread.youtubeId"
        :width="413"
        :height="275"
      />
    </template>
    <template v-else>
      <MarkDownSection
        v-if="thread.markdownContent"
        :content="snippet"
        class="contentSnippet"
      />
      <p
        v-else
        class="contentSnippet TypeBody2"
      >
        {{ snippet }}
      </p>
    </template>
  </Card>
</template>