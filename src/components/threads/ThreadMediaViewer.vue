<script lang="ts" setup>
import { Thread } from '@11thdeg/skaldstore'
import { computed, onMounted, ref } from 'vue'
import YoutubePreview from '../ui/YoutubePreview.vue'
import ImageList from '../ui/ImageList.vue'
import { logDebug } from '../../utils/loghelpers'
import { useThreads } from '../../composables/useTheads'

const { fetchThread } = useThreads()

const props = defineProps<{
  threadid: string
}>()

const thread = ref<Thread|undefined>(undefined)

onMounted(async ()  => {
  thread.value = await fetchThread(props.threadid)
})

const hasYoutube = computed(() => thread.value?.youtubeId ? true : false)
const imageCount = computed(() => thread.value?.images?.length || 0)
const youtubeId = computed(() => thread.value?.youtubeId || '')
const imageList = computed(() => {
  const m = new Map<string, string>()
  if (thread.value?.images) {
    thread.value?.images.forEach(i => m.set(i, i))
  }
  return m
})
const poster = computed({
  get: () => {
  if (!thread.value?.poster) return ''
  return thread.value?.poster
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
        :src="poster"
      >
      <ImageList
        v-if="imageCount > 1"
        v-model="poster"
        :images="imageList"
      />
    </template>
  </section>
</template>