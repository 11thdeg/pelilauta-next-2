<script lang="ts" setup>
import { Thread } from '@11thdeg/skaldstore';
import { computed } from 'vue'
import { useI18n } from 'vue-i18n';

const props = defineProps<{
  thread:Thread
}>()

const loves = computed(() => {
  if (!props.thread.lovedCount) return 0
  return props.thread.lovedCount
})

const t = useI18n().t
</script>

<template>
  <span class="TopicTag">
    <router-link :to="`/threads/${props.thread.key}`">
      {{ loves }} {{ t('info.loves') }}
    </router-link>
  </span>
</template>