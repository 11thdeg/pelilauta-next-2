<script lang="ts" setup>import { computed } from 'vue';


const props = defineProps<{
  videoId: string
  width?: number
  height?: number
}>()

const w = computed(() => props.width || 320)
const h = computed(() => props.height || 180)
</script>

<template>
  <div :style="`height: ${h}; width: ${w}`">
    <iframe 
      :height="h +'px'"
      :width="w +'px'"
      :src="`https://www.youtube.com/embed/${videoId}`"
      style="border: none;"
    />
  </div>
</template>