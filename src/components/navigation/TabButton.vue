<script setup lang="ts">
import { computed } from 'vue'
import Icon from '../ui/Icon.vue'

const props = defineProps<{
  disabled?: boolean,
  active?: boolean,
  label: string,
  icon?: string
  to?: string
}>()

const active = computed(() => {
  return props.disabled ? false : props.active
})

</script>

<template>
  <button
    :disabled="props.disabled"
    class="TabButton"
    :class="{
      active: active
    }"
  >
    <Icon
      v-if="icon"
      :icon="icon"
      small
    />
    <span class="label TypeButton hideOnMobile">{{ label }}</span>
  </button>
</template>

<style lang="sass" scoped>
.TabButton
  flex-grow: 1
  background: none
  border: none
  border-bottom: 2px solid var(--chroma-secondary-a)
  transition: all 300ms ease-in-out
  &:hover
    background-color: var(--chroma-secondary-a)
    border-bottom: 2px solid var(--chroma-secondary-b)
  &.active
    background-color: var(--chroma-secondary-a)
    border-bottom: 2px solid var(--chroma-secondary-d)
    &:hover
      background-color: var(--chroma-secondary-d)
      border-bottom: 2px solid var(--chroma-secondary-h)
body #app span.label.TypeButton
  padding-left: var(--page-column-gap)
</style>