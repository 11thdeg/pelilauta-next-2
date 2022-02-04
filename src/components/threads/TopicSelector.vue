<script lang="ts" setup>
import { computed } from 'vue';
import { useStore } from '../../stores/main';
import Select from '../ui/Select.vue'

const props = defineProps<{
  modelValue:string
  }>()
const emit = defineEmits<{
  (e: 'update:modelValue', modelValue: string): void
}>()

const selected = computed({
  get: () => props.modelValue,
  set: (value:string) => {
    emit('update:modelValue', value)
  }
})
const store = useStore()

const topics = computed(() => {
  const t = store.topics
  const list:Record<string, string> = {}
  t.forEach((topic) => {
    list[topic.slug] = topic.name
  })
  return list
})


</script>

<template>
  <Select
    v-model="selected"
    :options="topics"
  />
</template>