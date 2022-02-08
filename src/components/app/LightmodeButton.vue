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
      class="hoverable clickable"
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
</style>