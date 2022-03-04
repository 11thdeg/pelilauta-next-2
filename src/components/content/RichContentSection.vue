<script lang="ts" setup>
import { marked } from 'marked'
import { computed } from 'vue'

const props = defineProps<{
  contentEntry: {
    markdownContent?: string,
    htmlContent?: string
  }
}>()

const content = computed(() => {
  if (props.contentEntry.markdownContent) {
    return marked(props.contentEntry.markdownContent)
  } else if (props.contentEntry.htmlContent) {
    return props.contentEntry.htmlContent
  } else {
    return ''
  }
})
</script>

<template>
  <section
    :innerHTML="content"
    class="RichText RichContentSection"
  />
</template>
