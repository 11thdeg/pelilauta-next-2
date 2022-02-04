<script lang="ts" setup>import { ref, watch } from 'vue';

const props = defineProps<{
  modelValue: string,
  error?: boolean,
  label: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', modelValue: string): void
}>()

const value = ref(props.modelValue)

watch(props, (p) => {
  if (p.modelValue !== value.value) {
    value.value = p.modelValue
  }
}, { immediate: true })

function onInput() {
  emit('update:modelValue', value.value)
}
</script>

<template>
  <label
    class="Textfield"
    :class="{ error: error }"
  >
    <input
      v-model="value"
      type="text"
      @input="onInput"
      @blur="onInput"
    >
    <span class="labelText">{{ label }}</span>
  </label>
</template>

<style lang="sass" scoped>
@import ../../styles/typography-mixins.sass

.Textfield
  height: 48px
  position: relative
  display: block
 
  .labelText
    @include TypeCaption()
    padding: 0 8px
    position: absolute
    top: 2px
    left: 0
    z-index: 2
    pointer-events: none
    color: var(--color-field-active-border)
  input
    @include TypeBody2()
    background: none
    border: none
    height: 28px
    position: absolute
    bottom: 0px
    left: 0px
    width: 100%
    box-sizing: border-box
    margin: 0
    padding: 0 8px
    height: 48px
    padding-top: 16px
    border: none
    background-color: var(--color-field-background)
    border-bottom: var(--color-field-border) solid 1px
    border-radius: 0 12px 0 0
    color: var(--color-high)
    &:hover
      border: none
      background-color: var(--color-field-hover-background)
      border-bottom: var(--color-field-hover-border) solid 1px
    &:focus, &:active
      border: none
      background-color: var(--color-field-active-background)
      border-bottom: var(--color-field-active-border) solid 1px
      outline: none


</style>
