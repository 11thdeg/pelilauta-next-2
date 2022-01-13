<script lang="ts" setup>import { ref } from 'vue';

const props = defineProps<{
  modelValue: string,
  error?: boolean,
  label?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', modelValue: string): void
}>()

const value = ref(props.modelValue)

function onInput() {
  emit('update:modelValue', value.value)
}
</script>

<template>
  <div class="Textfield">
    <label
      :class="{ error: error }"
    >{{ label }}
      <input
        v-model="value"
        type="text"
        @input="onInput"
        @blur="onInput"
      >
    </label>
  </div>
</template>

<style lang="sass" scoped>
@import ../../styles/typography-mixins.sass

.Textfield
  background-color: var(--color-rise-a)
  border-bottom: var(--color-rise-b) solid 1px
  height: 48px
  position: relative
  border-radius: 0 12px 0 0
  label
    @include TypeCaption()
    padding: 0 8px
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


</style>
