<script lang="ts" setup>import { computed, useSlots } from 'vue';
import ActionBar from './ActionBar.vue';
import SpacerDiv from './SpacerDiv.vue';

const props = defineProps<{
  rise?: number // Defaults to 1
}>()

const classes = computed(() => ({
  'rise-0': props.rise === 0,
  'rise-1': props.rise === undefined || props.rise === 1,
  'rise-2': props.rise === 2,
  'rise-3': props.rise === 3,
  withActions: hasActions.value
}))

const slots = useSlots()
const hasActions = computed(() => !!slots.actions)
</script>

<template>
  <div
    class="card"
    :class="classes"
  >
    <slot />
    <ActionBar
      v-if="hasActions"
      class="bottomActions"
    >
      <SpacerDiv />
      <slot name="actions" />
    </ActionBar>
  </div>
</template>

<style lang="sass" scoped>
.card
  border-radius: 12px
  padding: 8px 16px
  margin: 0
  position: relative
  &.withActions
    padding-bottom: 64px
  .bottomActions
    position: absolute
    bottom: 8px
    left: 0
    width: 100%
    box-sizing: border-box
    padding: 0 8px
    gap: 0
</style>