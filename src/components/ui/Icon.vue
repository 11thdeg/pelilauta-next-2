<script lang="ts" setup>
import { iconlist } from './iconlist'
import { computed } from 'vue'
import { useLightMode } from '../../composables/lightmode'

const props = defineProps<{
  icon: string,
  xsmall?: boolean,
  small?: boolean,
  medium?: boolean,
  large?: boolean,
  xlarge?: boolean
}>()

const { mode: lightmode } = useLightMode()

const iconPath = computed(() => {
  const icon = props.icon
  if (!iconlist.includes(icon)) {
    throw new Error(`Icon ${icon} not found`)
  }
  return `/proprietary/icons/${lightmode.value}/${icon}.svg`
})

</script>

<template>
  <img
    :src="iconPath"
    :alt="icon"
    class="icon"
    :class="{ medium: medium, large: large, small: small, xsmall: xsmall, xlarge: xlarge }"
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
    height: 36px
    height: 36px
  &.xsmall
    height: 16px
    width: 16px
  &.xlarge
    height: 128px
    width: 128px
</style>