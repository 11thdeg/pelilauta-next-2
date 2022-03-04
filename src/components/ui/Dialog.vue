<script lang="ts" setup>
import Icon from './Icon.vue'
const props = defineProps<{
  modelValue: boolean
  label: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', modelValue: boolean): void
}>()

function close () {
  emit('update:modelValue', false)
}

</script>

<template>
  <div
    v-if="props.modelValue"
    id="Dialog"
    class="layer-important"
  >
    <div
      id="DialogCard"
      class="theme-surface"
    >
      <div class="dialogTopBar">
        <Icon
          icon="close"
          medium
          @click="close"
        />
        <h4 class="label">
          {{ props.label }}
        </h4>
      </div>
      <div class="contentSlot">
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped lang="sass">
#Dialog
  background-color: rgba(0, 33, 58, 0.7)
  position: fixed
  top: 0
  left: 0
  width: 100vw
  height: 100vh

.dialogTopBar
  display: flex
  .icon
    margin: 8px
  h4.label
    flex-grow: 1
    text-align: center

.contentSlot
  padding: 16px
  overflow-y: auto
  max-height: calc(100vh - 64px)


#DialogCard
  position: fixed
  top: 50%
  left: 50%
  transform: translate(-50%, -50%)
  height: auto
  border-radius: 4px
  width: 720px
  border-radius: 4px
  
</style>