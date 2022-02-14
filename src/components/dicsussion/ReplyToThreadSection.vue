<script lang="ts" setup>
import { Reply } from '@11thdeg/skaldstore';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n'
import { logDebug } from '../../utils/loghelpers';
import MarkdownArea from '../ui/MarkdownArea.vue';
const t = useI18n().t

const reply = ref(new Reply())

const props = defineProps<{
  threadid: string
}>()

logDebug('ThreadDiscussionColumn.vue: threadid=', props.threadid)
</script>

<template>
  <section>
    <h4>{{ t('reply.title') }}</h4>
    <MarkdownArea v-model="reply.markdownContent" />
  </section>
</template>