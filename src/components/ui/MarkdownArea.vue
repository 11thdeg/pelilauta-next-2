<script lang="ts" setup>
import TextArea from "./TextArea.vue"
import MarkdownSection from "./MarkdownSection.vue"
import { computed } from "vue";

const props = defineProps<{
  preview?: boolean,
  modelValue: string,
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', modelValue: string): void
}>()

const value = computed({
  get: () => props.modelValue,
  set: (v: string) => {
    emit('update:modelValue', v)
  }
})

</script>

<template>
  <div class="MarkdownArea">
    <div
      v-if="preview"
      class="markdownFrame"
    >
      <MarkdownSection
        :content="modelValue"
      />
    </div>
    <TextArea
      v-else
      v-model="value"
    />
  </div>
</template>

<style lang="sass">
.markdownFrame
  border-bottom: 1px solid var(--color-rise-b)
  background: none
  background-color: var(--color-rise-a)
  margin: 12px 0
  border-radius: 0 8px 0 0
  width: 100%
  box-sizing: border-box
  padding: 8px
  min-height: 72px
</style>