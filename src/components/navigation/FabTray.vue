<script lang="ts" setup>
import { onMounted, onUnmounted } from 'vue';
import { useStore } from '../../stores/main'

const mainStore = useStore()

onMounted(() => {
  mainStore.mountFabs()
})

onUnmounted(() => {
  mainStore.unmountFabs()
})
</script>

<template>
  <nav id="FabTray">
    <slot />
  </nav>
</template>

<style lang="sass" scoped>
@import '../../styles/include-media.scss'
  
nav#FabTray
  position: fixed
  bottom: 56px
  right: 0
  padding: 16px
  display: flex
  flex-direction: column-reverse
  align-items: flex-end
  gap: 12px

@include media('>=tablet')
  nav#FabTray
    bottom: 0px
</style>