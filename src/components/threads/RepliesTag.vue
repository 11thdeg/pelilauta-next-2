<script lang="ts" setup>
import { Thread } from '@11thdeg/skaldstore'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useProfile } from '../../composables/useProfile'

const props = defineProps<{
  thread:Thread
}>()

const replies = computed(() => {
  if (!props.thread.replyCount) return 0
  return props.thread.replyCount
})

const t = useI18n().t

const profile = useProfile().profile
const newReplies = computed(() => {
  if (profile.value &&
    props.thread.flowTime < profile.value.seenThreadAt(props.thread.key || '')) {
      return true
    }
  return false
})
const debug = computed(() =>{
  return profile?.value?.seenThreadAt(props.thread.key || '')
})
</script>

<template>
  <span
    class="TopicTag Pill"
    :class="{alert: newReplies}"
  >
    <router-link :to="`/threads/${props.thread.key}`">
      {{ replies }} {{ t('info.replies') }}
    </router-link>
  </span>
  {{ debug }}
</template>

<style scoped>
.TopicTag.alert {
  background-color: var(--chroma-primary-b);
}
</style>