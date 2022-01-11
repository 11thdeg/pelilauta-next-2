<script setup lang="ts">
import { defineProps } from 'vue'
import { useLightMode } from '../../composables/lightmode'

const props = defineProps<{
  icon: string
  label: string
  to: string
}>()

const mode = useLightMode()
</script>

<template>
  <div
    class="NavButton"
    @click.prevent="$router.push(props.to)"
  >
    <img :src="`/proprietary/icons/${mode}/${props.icon}.svg`">
    <div class="label">
      {{ props.label }}
    </div>
  </div>
</template>

<style scoped lang="sass">
div.NavButton
  height: 72px
  width: 72px
  box-sizing: border-box
  margin: 0
  padding: 14px 24px
  overflow: hidden
  position: relative
  display: inline-block
  background-color: var(--color-background)
  transition: 0.22s all
  &:hover
    background-color: var(--color-rise-a)
  img
    height: 24px
    width: 24px
  div.label
    position: absolute
    bottom: 16px
    left: 0
    margin: 0
    padding: 0
    line-height: 12px
    font-size: 12px
    text-align: center
    width: 72px
    font-weight: bold

</style>