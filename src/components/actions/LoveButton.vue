<script lang="ts" setup>
import Icon from '../ui/Icon.vue';

const props = defineProps<{
  count: number
  loves: boolean
  disabled?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:loves', selected: boolean): void
}>()

function clicked () {
  emit('update:loves', !props.loves)
}

</script>

<template>
  <button
    class="TypeButton LoveButton"
    :class="{
      active: loves,
      disabled: disabled,
    }"
    @click="clicked"
  >
    <span class="count">
      {{ count }}
    </span>
    <Icon
      v-if="loves"
      icon="loves"
      xsmall
    />
    <Icon
      v-else
      icon="love"
      xsmall
    />
  </button>
</template>

<style lang="sass" scoped>
#app button.LoveButton.TypeButton
  background-color: var(--chroma-secondary-b)
  border: none
  box-sizing: border-box
  display: inline-block
  height: 20px
  line-height: 20px
  margin: 0
  padding: 0 8px
  border-radius: 10px
  transition: background-color 0.2s ease-in-out
  &:hover
    background-color: var(--chroma-secondary-d)  
  &.active
    background-color: var(--chroma-primary-b)
    &:hover
      background-color: var(--chroma-primary-d)
  span.count
    margin-right: 2px
  &.disabled
    background-color: none

@mixin lightModeStyles()
    background-color: var(--chroma-secondary-h)
    color: var(--chroma-secondary-d)
    &:hover
      background-color: var(--chroma-secondary-g)
    &.active
      background-color: var(--chroma-primary-h)
      &:hover
        background-color: var(--chroma-primary-g)
        

@media (prefers-color-scheme: light)
  #app button.LoveButton.TypeButton
    @include lightModeStyles()
@media (prefers-color-scheme: dark)
  body.light-theme
    #app button.LoveButton.TypeButton
      @include lightModeStyles()

</style>