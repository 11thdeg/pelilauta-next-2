<script lang="ts" setup>import { ref } from 'vue';

const props = defineProps<{
  label: string,
  options: Record<string, string>,
  modelValue: string,
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', modelValue: string): void
}>()

const value = ref<string>(props.modelValue)

function onChange () {
  emit('update:modelValue', value.value)
}

</script>

<template>
  <label class="Select">
    <select
      v-model="value"
      @change="onChange"
    >
      <option
        v-for="option, key in options"
        :key="key"
        :value="key"
        :selected="option === modelValue"
      >
        {{ option }}
      </option>
    </select>
    <span class="labelText">{{ label }}</span>
  </label>
</template>

<style lang="sass" scoped>
@import ../../styles/typography-mixins.sass

.Select
  height: 48px
  position: relative
  display: inline-block
  .labelText
    @include TypeCaption()
    padding: 0 8px
    position: absolute
    top: 2px
    left: 0
    z-index: 2
    pointer-events: none
    color: var(--color-field-active-border)

  select
    @include TypeBody2()
    background: none
    border: none
    height: 48px
    box-sizing: border-box
    margin: 0
    padding: 0 4px
    padding-top: 16px
    min-width: 144px
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