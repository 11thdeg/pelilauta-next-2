<script lang="ts" setup>import { ref } from 'vue'
import { logDebug } from '../../utils/loghelpers'

const props = defineProps<{
  modelValue:string,
  images:Map<string, string>
  }>()

const emit = defineEmits<{
  (e: 'update:modelValue', modelValue: string): void
}>()

const selected = ref(props.modelValue)

logDebug('ImageList', 'props', props)

function select (value: string) {
  selected.value = value
  emit('update:modelValue', value)
}

</script>

<template>
  <section class="ImageList">
    <ul>
      <li
        v-for="image in images"
        :key="image[0]"
        :class="{ selected: selected === image[0] }"
        @click="select(image[0])"
      >
        <img
          :src="image[1]"
          :alt="image[0]"
        >
      </li>
    </ul>
  </section>
</template>

<style lang="sass" scoped>
section.ImageList
  ul
    list-style: none
    display: flex
    gap: 4px
    li
      list-style: none
      height: 72px
      width: 72px
      border-radius: 6px
      box-sizing: border-box
      img
        height: 64px
        width: 64px
        border-radius: 4px
        margin: 4px
        object-fit: cover
      &.selected
        background-color: var(--chroma-primary-e)
</style>