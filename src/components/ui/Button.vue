<template>
  <button class="Button" :class="styleClasses">
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  disabled?: Boolean
}>()

const styleClasses = computed(() => {
  disabled: props.disabled
})
</script>

<style lang="sass">
button.Button
  background-color: var(--chroma-secondary-d)
  color: var(--chroma-secondary-i)
  border: none
  height: 38px
  margin: 5px
  padding: 0 18px
  border-radius: 19px
  transition-property: box-shadow background
  transition-duration: 0.3s
  position: relative
  &:hover
    background-color: var(--chroma-secondary-e)
  &:active
    background-color: var(--chroma-secondary-c)
</style>
