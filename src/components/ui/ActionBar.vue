<script lang="ts" setup>
import { ref } from 'vue'

const props = defineProps<{
  centered?: boolean
}>()

const layoutClasses = ref({
  centered: props.centered
})
</script>

<template>
  <section
    class="ActionBar barComponent"
    :class="layoutClasses"
  >
    <slot />
  </section>
</template>

<style lang="sass" scoped>
.ActionBar
  display: flex
  flex-direction: row
  gap: var(--page-grid-gap)
  align-items: center
  &.centered
    justify-content: center

.ActionBar + .ActionBar
  margin-top: var(--page-grid-gap)
</style>