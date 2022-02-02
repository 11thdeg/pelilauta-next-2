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
    <MarkdownSection
      v-if="preview"
      :content="modelValue"
    />
    <TextArea
      v-else
      v-model="value"
    />
  </div>
</template>