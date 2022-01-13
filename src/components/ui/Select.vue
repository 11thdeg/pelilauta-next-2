<script lang="ts" setup>import { ref } from 'vue';

const props = defineProps<{
  label?: string,
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
  <div class="Select">
    <label>
      {{ label }}
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
    </label>
  </div>
</template>

<style lang="sass" scoped>
@import ../../styles/typography-mixins.sass

.Select
  background-color: var(--color-rise-a)
  border-bottom: var(--color-rise-b) solid 1px
  height: 48px
  position: relative
  border-radius: 0 12px 0 0
  display: inline-block
  label
    @include TypeCaption()
    padding: 0 8px
    padding-right: 32px
  select
    @include TypeBody2()
    background: none
    border: none
    height: 28px
    position: absolute
    bottom: 0px
    left: 0px
    width: calc(100% - 8px)
    box-sizing: border-box
    margin: 0
    padding: 0 8px

</style>