<script lang="ts" setup>import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const props = defineProps<{
  modelValue:string,
  label:string,
}>()
const emit = defineEmits<{
  (e: 'update:modelValue', modelValue: string): void
}>()

const value = computed({
  get: () => props.modelValue,
  set: (v:string) => {
    emit('update:modelValue', v)
  }
})

const t = useI18n().t

</script>

<template>
  <textarea
    v-model="value"
    class="Textarea"
    :placeholder="t(label)"
  />
</template>

<style lang="sass" scoped>
textarea.Textarea
  border: none
  border-bottom: 1px solid #ccc
  background: none
  background-color: var(color-rise-a)
  margin: 12px 0
</style>