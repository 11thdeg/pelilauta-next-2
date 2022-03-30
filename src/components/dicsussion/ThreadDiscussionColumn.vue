<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import Column from '../ui/Column.vue'
import ReplyToThreadSection from './ReplyToThreadSection.vue'
import ThreadRepliesSection from './ThreadRepliesSection.vue'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<{
  threadid: string
}>()

const t = useI18n().t
</script>

<template>
  <Column>
    <h2>{{ t('discourse.title') }}</h2>
    <ThreadRepliesSection :threadid="threadid" />
    <ReplyToThreadSection :threadid="threadid" />
  </Column>
</template>