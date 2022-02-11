<script lang="ts" setup>
import { Thread } from '@11thdeg/skaldstore'
import { computed } from 'vue';
import YoutubePreview from '../ui/YoutubePreview.vue';
import ImageList from '../ui/ImageList.vue';
import { logDebug } from '../../utils/loghelpers';

const props = defineProps<{
  thread: Thread
}>()

const hasYoutube = computed(() => {
  if (!props.thread.youtubeId) return false
  return true
})
const imageCount = computed(() => {
  if (!props.thread.images) return 0
  return props.thread.images.length
})
const youtubeId = computed(() => {
  if (!props.thread.youtubeId) return ''
  return props.thread.youtubeId
})
const imageList = computed(() => {
  const m = new Map<string, string>()
  if (props.thread.images) {
    props.thread.images.forEach(i => m.set(i, i))
  }
  return m
})
const poster = computed({
  get: () => {
  if (!props.thread.poster) return ''
  return props.thread.poster
  },
  set: (val:string) => {
    logDebug('poster can not be set', val)
  }
})
</script>

<template>
  <section class="ThreadMediaViewer">
    <YoutubePreview
      v-if="hasYoutube"
      :video-id="youtubeId"
      :width="720"
      :height="720/3*2"
    />
    <template v-if="!hasYoutube && imageCount">
      <img
        class="poster"
        :src="thread.poster"
      >
      <ImageList
        v-if="imageCount > 1"
        v-model="poster"
        :images="imageList"
      />
    </template>
  </section>
</template>