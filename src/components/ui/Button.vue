<script setup lang="ts">
import { defineProps } from 'vue'
import Icon from './Icon.vue';

const props = defineProps<{
  disabled?: boolean,
  text?: boolean,
  icon?: string
}>()

</script>


<template>
  <button
    class="Button"
    :disabled="props.disabled"
    :class="{ 'text': props.text }"
  >
    <Icon
      v-if="icon"
      class="inButton"
      :icon="icon"
      small
    />
    <slot />
  </button>
</template>

<style lang="sass" scoped>
@import ../../styles/typography-mixins.sass

button.Button
  @include TypeButton()
  background-color: var(--color-button)
  color: var(--color-button-text)
  border: none
  height: 38px
  margin: 5px
  padding: 0 18px
  border-radius: 19px
  transition-property: box-shadow background
  transition-duration: 0.3s
  position: relative
  .inButton
   margin-left: -10px
   padding-right: 4px
   margin-top: -2px
  &:hover
    background-color: var(--color-button-hover)
  &:active
    background-color: var(--color-button-active)
  &:disabled
    background-color: var(--color-button-disabled)
    color: var(--color-button-disabled-text)
    cursor: not-allowed
  &.text
    background: none
    &:hover
      background-color: var(--color-text-button-hover)
    &:active
      background-color: var(--color-text-button-active)

.theme-surface
  button.Button
    background-color: var(--color-on-surface)
    &.text
      background: none
      &:hover
        background-color: var(--color-text-button-hover)
      &:active
        background-color: var(--color-text-button-active)
</style>
