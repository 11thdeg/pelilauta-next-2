<script lang="ts" setup>
import TextArea from "./TextArea.vue"
import MarkdownSection from "./MarkdownSection.vue"
import { computed } from "vue"

const props = defineProps<{
  preview?: boolean,
  modelValue: string,
  collapsed?: boolean,
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
      :collapsed="collapsed || false"
    />
  </div>
</template>

<style lang="sass">
.markdownFrame
  margin: 0
  border-radius: 0 8px 0 0
  width: 100%
  box-sizing: border-box
  padding: 8px
  background-color: var(--color-field-background)
  border-bottom: var(--color-field-border) solid 1px
  border-radius: 0 12px 0 0
  color: var(--color-high)
  transition: all 0.2s ease-in-out
</style>