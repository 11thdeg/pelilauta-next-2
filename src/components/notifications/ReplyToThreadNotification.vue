<script lang="ts" setup>
import { Thread, Notification } from '@11thdeg/skaldstore'
import { onMounted, ref } from 'vue'
import { useThreads } from '../../composables/useTheads';
import { logDebug } from '../../utils/loghelpers';
import NotificationArticle from './NotificationArticle.vue'

const props = defineProps<{
  notification: {
    key: string
    from: string
    targetKey: string
    message: string
    targetType: string
  }
}>()

const { fetchThread } = useThreads()

const thread = ref(new Thread())

onMounted(async () => {
  const t = await fetchThread(props.notification.targetKey)
  if (t) thread.value = t
  else logDebug('NotificationArticle: could not fetch thread', props.notification.targetKey)
})
</script>

<template>
  <NotificationArticle 
    class="ReplyToThreadNotification.vue"
    :label="notification.targetType"
    :to="`/threads/${thread.key}`"
    :from="notification.from" 
    :message="notification.message" 
    :target-label="thread.title"
  />
</template>