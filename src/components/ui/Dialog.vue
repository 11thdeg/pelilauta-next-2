<script lang="ts" setup>
import Icon from './Icon.vue';
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
    >
      <div class="dialogTopBar">
        <Icon
          icon="close"
          medium
          @click="close"
        />
        <h3 class="label">
          {{ props.label }}
        </h3>
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
  h3
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
  background-color: var(--color-rise-a)
  border-radius: 4px
  
</style>