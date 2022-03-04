<script lang="ts" setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStore } from '../../stores/main'
import Select from '../ui/Select.vue'

const props = defineProps<{
  modelValue:string
  }>()
const emit = defineEmits<{
  (e: 'update:modelValue', modelValue: string): void
}>()

const selected = computed({
  get: () => props.modelValue || 'Yleinen',
  set: (value:string) => {
    emit('update:modelValue', value)
  }
})
const store = useStore()

const topics = computed(() => {
  const t = store.streams
  const list:Record<string, string> = {}
  Object.keys(t).forEach((key) => {
    if(key !== '-') list[key] = t[key].name // "-" is a virtual topic we need for technical reasons, not a real one
  })
  return list
})

const t = useI18n().t

</script>

<template>
  <Select
    v-model="selected"
    :label="t('thread.fields.topic')"
    :options="topics"
  />
</template>