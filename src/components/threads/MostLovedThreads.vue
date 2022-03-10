<script lang="ts" setup>
import Column from '../ui/Column.vue'
import { useI18n } from 'vue-i18n'
import { useThreads } from '../../composables/useTheads'
import { computed, onMounted, onUnmounted } from 'vue'
import ThreadCard from './ThreadCard.vue'
import CardStreamSection from '../layout/CardStreamSection.vue'

const { t } = useI18n()
const {
  mostDiscussedThreads,
  subscribeMostDiscussedThreads,
  unsubscribeMostDiscussedThreads
} = useThreads()

onMounted(() => {
  subscribeMostDiscussedThreads()
})
onUnmounted(() => {
  unsubscribeMostDiscussedThreads()
})
const topFive = computed(() => {
  return mostDiscussedThreads.value.slice(0, 5)
})
</script>
<template>
  <Column class="MostDiscussedThreads">
    <h3>{{ t('discourse.mostLoved.title') }}</h3>
    <CardStreamSection>
      <ThreadCard
        v-for="thread in topFive"
        :key="thread.key"
        :thread="thread"
      />
    </CardStreamSection>
  </Column>
</template>