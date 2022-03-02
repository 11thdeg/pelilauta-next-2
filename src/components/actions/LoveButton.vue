<script lang="ts" setup>
import Icon from '../ui/Icon.vue';

const props = defineProps<{
  count: number
  loves: boolean
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
    :class="{ active: loves }"
    @click="clicked"
  >
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
    <span class="count">
      {{ count }}
    </span>
  </button>
</template>

<style lang="sass" scoped>
#app button.LoveButton.TypeButton
  background-color: var(--chroma-secondary-b)
  border: none
  box-sizing: border-box
  display: inline-block
  height: 24px
  line-height: 24px
  margin: 0
  padding: 0 8px
  border-radius: 6px
  transition: background-color 0.2s ease-in-out
  &:hover
    background-color: var(--chroma-secondary-d)  
  &.active
    background-color: var(--chroma-primary-b)
    &:hover
      background-color: var(--chroma-primary-d)
  span.count
    margin-left: 8px

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