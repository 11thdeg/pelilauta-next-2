<script lang="ts" setup>
import { useLightMode } from '../../composables/lightmode';
import Icon from '../ui/Icon.vue'

const { toggleMode } = useLightMode()

</script>

<template>
  <div
    class="LightmodeButton"
    @click.prevent="toggleMode"
  >
    <Icon
      icon="lightmode"
      medium
    />
  </div>
</template>

<style lang="sass" scoped>
div.LightmodeButton
  height: 36px
  width: 36px
  box-sizing: border-box
  margin: calc((64px - 36px) / 2) 0
  padding: 0
  opacity: 0.83
  transition: all 0.2s ease-in-out
  border-radius: 50%
  &:hover
    opacity: 1
    background: var(--color-rise-a)
    border-radius: 50%
  &:active
    background: var(--color-rise-b)
    border-radius: 8px
</style>