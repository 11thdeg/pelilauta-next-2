<script lang="ts" setup>
import { computed } from 'vue'
import Icon from './Icon.vue'

const props = defineProps<{
  label?: string
  icon?: string
  modelValue: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const checked = computed({
  get: () => props.modelValue,
    set: (value: boolean) => {
        emit('update:modelValue', value)
    }
  }
)

const resolvedIcon = computed(() => {
  if (props.icon) return props.icon
  if (props.modelValue) return 'check'
  return 'add'
})
</script>
<template>
  <div class="ToggleButton">
    <input
      v-model="checked"
      type="checkbox"
      class="checkbox"
    >
    <div class="knobs">
      <Icon
        :icon="resolvedIcon"
        xsmall
        class="knob-icon"
        on-bright
      />
    </div>
    <div class="layer" />
  </div>
</template>
<style scoped>
div.ToggleButton {
    position: relative;
    display: inline-block;
    width: 48px;
    height: 24px;
    cursor: pointer;
    top: 6px;

}
div.ToggleButton,
div.ToggleButton * {
  user-select: none;
  -webkit-tap-highlight-color:transparent;
}
div.ToggleButton:focus,
div.ToggleButton *:focus {
  outline: none;
}
.checkbox
{
    position: relative;
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    opacity: 0;
    cursor: pointer;
    z-index: 3;
}
.knobs, .layer
{
    
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
}
.knobs
{
    position: absolute;
    top: 2px;
    left: 2px;
    z-index: 2;
    transition: 0.3s ease all;
    height: 20px;
    width: 20px;
    border-radius: 10px;
    background-color: var(--chroma-secondary-d);
}
.layer
{
    top: 0;
    left: 0;
    position: absolute;
    width: 48px;
    background-color: var(--chroma-secondary-b);
    transition: 0.3s ease all;
    z-index: 1;
    border-radius: 12px;
}
.checkbox:checked + .knobs + .layer
{
  background-color: var(--chroma-primary-b);
}
.checkbox:checked + .knobs
{
    background-color: var(--chroma-primary-g);
    transform: translateX(22px);
}
.knob-icon {
    width: 100%;
    height: 100%;
    object-fit: contain;
    opacity: 0;
    transition: 0.3s ease all;
}
.checkbox:checked + .knobs .knob-icon {
  opacity: 1;
}
</style>