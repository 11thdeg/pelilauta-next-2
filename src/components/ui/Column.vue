<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps<{
  double?: boolean
  cut?: boolean
}>()

const layoutClasses = computed(() => {
  const classes = []
  if (props.double && !props.cut) {
    classes.push('double')
  } else if (props.double) {
    classes.push('double')
  }
  return classes.join(' ')
})
</script>

<template>
  <article
    class="Column"
    :class="layoutClasses"
  >
    <slot />
  </article>
</template>

<style lang="sass" scoped>

.Column
  padding: 0
  margin: 0
  box-sizing: border-box
  display: block
</style>