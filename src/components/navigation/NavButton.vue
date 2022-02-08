<script setup lang="ts">
import { useLightMode } from '../../composables/lightmode'

const props = defineProps<{
  icon: string
  label: string
  to: string
  disabled?: boolean
}>()

const { mode } = useLightMode()
</script>

<template>
  <div
    class="NavButton"
    :class="{ disabled: disabled }"
    @click.prevent="$router.push(props.to)"
  >
    <img
      :src="`/proprietary/icons/dark/${props.icon}.svg`"
      class="dark"
    >
    <img
      :src="`/proprietary/icons/${mode}/${props.icon}.svg`"
      class="light"
    >
    <div class="label">
      {{ props.label }}
    </div>
  </div>
</template>

<style scoped lang="sass">
@import '../../styles/include-media.scss'

div.NavButton
  height: 72px
  width: 72px
  box-sizing: border-box
  margin: 0
  padding: 10px 18px
  overflow: hidden
  position: relative
  display: inline-block
  transition: 0.22s all
  &:hover
    background-color: var(--color-rise-a)
  img
    height: 36px
    width: 36px
  div.label
    position: absolute
    bottom: 10px
    left: 0
    margin: 0
    padding: 0
    line-height: 12px
    font-size: 12px
    text-align: center
    width: 72px
    font-weight: bold
    color: var(--chroma-secondary-h)
  &.disabled
    opacity: 0.2
    cursor: not-allowed

img.light
  display: none

@include media('>=600px')
  img.dark
    display: none
  img.light
    display: block

</style>