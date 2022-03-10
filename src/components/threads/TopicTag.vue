<script lang="ts" setup>
import { computed } from 'vue'
import { useStore } from '../../stores/main'

const props = defineProps<{
  slug:string
}>()

const store = useStore()

const topic = computed(() => {
  const s = store.streams
  if (Object.keys(s).includes(props.slug)) {
    return s[props.slug]
  }
  return { name: '---' }
})
</script>

<template>
  <span class="TopicTag">
    <router-link :to="`/forum/${props.slug}`">
      {{ topic.name }}
    </router-link>
  </span>
</template>