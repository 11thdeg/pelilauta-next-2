<script lang="ts" setup>
import { iconlist } from './iconlist'
import { computed } from 'vue'
import { useLightMode } from '../../composables/lightmode'

const props = defineProps<{
  icon: string,
  xsmall?: boolean,
  small?: boolean,
  large?: boolean,
  xlarge?: boolean,
  onBright?: boolean,
  invert?: boolean,
}>()

const { mode: lightmode } = useLightMode()

const iconPath = computed(() => {
  const icon = props.icon
  if (!iconlist.includes(icon)) {
    throw new Error(`Icon ${icon} not found`)
  }
  if (props.invert) {
    const mode = lightmode.value === 'dark' ? 'light' : 'dark'
    return `/proprietary/icons/${mode}/${icon}.svg`
  }
  return `/proprietary/icons/${props.onBright ? 'light' : lightmode.value}/${icon}.svg`
})

</script>

<template>
  <img
    :src="iconPath"
    :alt="icon"
    class="icon"
    :class="{
      large: large,
      small: small,
      xsmall: xsmall,
      xlarge: xlarge
    }"
  >
</template>

<style lang="sass" scoped>
img.icon
  display: inline-block
  margin: 0
  padding: 0
  vertical-align: middle
  height: 36px
  width: 36px
  &.small
    height: 24px
    width: 24px
  //medium does nothing!
  &.large
    height: 72px
    width: 72px
  &.xsmall
    height: 16px
    width: 16px
  &.xlarge
    height: 128px
    width: 128px
</style>
