<script lang="ts" setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import type { Timestamp } from '@firebase/firestore-types'
import { DateTime } from 'luxon'

const props = defineProps<{
  time: Timestamp|string|number|undefined
}>()

const t = useI18n().t

const since = computed(() => {
  if (!props.time) return '–––'
  const seconds = typeof props.time === 'string' ? 
    parseInt(props.time) : 
    typeof props.time === 'number' ? props.time : 
      props.time.seconds
  const date = DateTime.fromSeconds(seconds)
  const duration = DateTime.now().diff(date)
  if (duration.toMillis() < 30 * 60000) {
    // less than 30 minutes ago
    return '< 30 min ' +t('info.ago')
  }
  if (duration.toMillis() < 4 * 60 * 60000) {
    // less than 4 hours ago
    return '< 4h ' + t('info.ago')
  }
  return date.toFormat('dd.MM.yyyy – HH:mm')
})
</script>

<template>
  <span class="sinceTag TypeBody2">
    {{ since }}
  </span>
</template>