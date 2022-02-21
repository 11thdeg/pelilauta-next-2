<script lang="ts" setup>
import { computed } from 'vue'
import { useUxState } from '../../composables/useUxState';

const uxState = useUxState()

const active = computed(() => uxState.showNavTrayOnMobile.value )
</script>

<template>
  <div
    class="HamburgerButton onlyOnMobile"
    :class="{ active: active }"
    @click.prevent="uxState.toggleMobileNavTray()"
  >
    <div class="hamburger">
      <div class="bar" />
      <div class="bar" />
      <div class="bar" />
    </div>
  </div>
</template>

<style lang="sass" scoped>
.HamburgerButton
  height: 36px
  width: 36px
  padding: 3px
  box-sizing: border-box
  border-radius: 50%
  background-color: var(--chroma-secondary-d)
  position: absolute
  top: 0px
  left: 16px
  transition: all 300ms ease-in-out
  z-index: 100000
  .hamburger  
    position: relative
    height: 30px
    width: 30px
    .bar
      opacity: 0.8
      background-color: white
      height: 4px
      width: 30px
      border-radius: 2px
      position: absolute
      display: block
      transition: all 350ms
      transition-timing-function: cubic-bezier(1, 0.05, 0.62, 1.78)
      &:first-of-type
        top: 3px
      &:nth-of-type(2)
        top: 13px
      &:nth-of-type(3)
        top: 24px
  &.active
    left: calc(100vw - 92px)
    background-color: var(--chroma-secondary-a)
    .bar
      transition: all 280ms
      transition-timing-function: cubic-bezier(1, 0.05, 0.62, 1.78)
      &:first-of-type
        top: 13px
        transform: rotate(45deg)
      &:nth-of-type(2)
        opacity: 0
        transform: translateX(-15px)
      &:nth-of-type(3)
        top: 13px
        transform: rotate(-45deg)
</style>

