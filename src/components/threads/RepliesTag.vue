<script lang="ts" setup>
import { Thread } from '@11thdeg/skaldstore'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps<{
  thread:Thread
}>()

const replies = computed(() => {
  if (!props.thread.replyCount) return 0
  return props.thread.replyCount
})

const t = useI18n().t
</script>

<template>
  <span class="TopicTag">
    <router-link :to="`/threads/${props.thread.key}`">
      {{ replies }} {{ t('info.replies') }}
    </router-link>
  </span>
</template>