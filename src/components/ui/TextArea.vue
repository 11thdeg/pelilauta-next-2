<script lang="ts" setup>import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const props = defineProps<{
  modelValue:string,
  label?:string,
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


function onExpandableTextareaInput({ target: node }:Event){
  if ((node as Node).nodeName.toLowerCase() !== 'textarea') return
  const elm = node as HTMLTextAreaElement

  if (elm.scrollHeight > elm.clientHeight) {
    elm.style.height = `${elm.scrollHeight}px`
  } else if (elm.scrollHeight < elm.clientHeight) {
    elm.style.height = `${elm.scrollHeight}px`
  }
}


</script>

<template>
  <textarea
    v-model="value"
    class="Textarea"
    :placeholder="label ? t(label) : ''"
    @input="onExpandableTextareaInput" 
  />
</template>

<style lang="sass" scoped>
@import '../../styles/typography-mixins.sass'

.Textarea
  @include TypeCode()
  font-size: 17px
  border: none
  border-bottom: 1px solid var(--color-rise-b)
  background: none
  background-color: var(--color-rise-a)
  margin: 12px 0
  width: 100%
  box-sizing: border-box
  padding: 8px
  min-height: 72px
  overflow: hidden
  resize: none
  border-radius: 0 8px 0 0
</style>