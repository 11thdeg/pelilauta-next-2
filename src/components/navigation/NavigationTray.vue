<script lang="ts" setup>
import { onMounted, onUnmounted } from 'vue';
import { useStore } from '../../stores/main'

const main = useStore()

onMounted(() => {
  main.mountTray()
})

onUnmounted(() => {
  main.unmountTray()
})

</script>

<template>
  <nav id="NavigationTray">
    <slot />
  </nav>
</template>

<style lang="sass" scoped>
#NavigationTray
  position: fixed
  top: 0
  left: 80px
  width: 360px
  border-right: 1px solid var(--color-border)
  height: 100vh
  margin: 0
  padding: 12px 16px
  box-sizing: border-box
  overflow-y: scroll
  scroll-bar-width: none
  &::-webkit-scrollbar
    display: none
</style>