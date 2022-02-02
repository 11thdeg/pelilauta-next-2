<script lang="ts" setup>
import { computed } from 'vue';
import Icon from './Icon.vue'

const props = defineProps<{
  icon: string,
  label: string,
  small?: boolean,
  secondary?: boolean,
  tertiary?: boolean,
}>()

const classes = computed(() => ({
    'small': props.small,
    'secondary': props.secondary && !props.tertiary,
    'tertiary': props.tertiary && !props.secondary,
    'withLabel': props.label && props.label.length > 0
  })) 
</script>

<template>
  <button
    class="Fab"
    :class="classes"
  >
    <Icon
      class="fabIcon"
      :icon="icon"
      small
      on-bright
    />
    <span
      v-if="label"
      class="label onlyOnDesktop"
    >{{ label }}</span>
  </button>
</template>



<style lang="sass" scoped>
@import '../../styles/typography-mixins.sass'
@import '../../styles/include-media.scss'

button.Fab
  @include TypeButton()
  color: var(--color-background)
  position: relative
  display: block
  flex-grow: 0
  flex-shrink: 0
  border: 0
  height: 56px
  width: 56px
  box-sizing: border-box
  margin: 0
  padding: 12px
  border-radius: 16px
  background-color: var(--chroma-primary-h)
  transition: all 0.3s
  .fabIcon
    position: absolute
    top: 16px
    left: 16px
  &.small
    height: 40px
    width: 40px
    border-radius: 12px
    padding: 8px 12px
    .fabIcon
      position: absolute
      top: 0
      left: 8px
      top: 8px
  &:hover
    background: var(--chroma-primary-h) radial-gradient(circle, transparent 0%, var(--chroma-secondary-i) 300%)
  &:active
    background: var(--chroma-primary-h) radial-gradient(circle, transparent 0%, var(--chroma-secondary-f) 300%)
  &.secondary
    color: var(--chroma-secondary-h)
    background-color: var(--chroma-secondary-d)
    &:hover
      background: var(--chroma-secondary-d) radial-gradient(circle, transparent 0%, var(--chroma-secondary-i) 200%)
    &:active
      background: var(--chroma-secondary-d) radial-gradient(circle, transparent 0%, var(--chroma-secondary-a) 200%)
  &.tertiary
    background-color: var(--chroma-alert)
    &:hover
      background: var(--chroma-alert) radial-gradient(circle, transparent 0%, var(--chroma-secondary-g) 200%)
    &:active
      background: var(--chroma-alert) radial-gradient(circle, transparent 0%, var(--chroma-secondary-i) 200%)
.FabTray
  .Fab:not(.small)
    margin-top: 8px
@include media('>desktop')
  button.Fab.withLabel
    width: auto
    .label
      padding-left: 40px
      white-space: nowrap
      overflow: hidden
    &.small
      .label
        padding-left: 24px
  div.FabTray.vertical
    .Fab:not(.small)
      margin-top: 0
      margin-left: 8px
</style>