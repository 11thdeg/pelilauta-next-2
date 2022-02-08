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
  margin: 0
  width: 100%
  box-sizing: border-box
  padding: 8px
  min-height: 220px
  overflow: hidden
  resize: none
  background-color: var(--color-field-background)
  border-bottom: var(--color-field-border) solid 1px
  border-radius: 0 12px 0 0
  color: var(--color-high)
  &:hover
    border: none
    background-color: var(--color-field-hover-background)
    border-bottom: var(--color-field-hover-border) solid 1px
  &:focus, &:active
    border: none
    background-color: var(--color-field-active-background)
    border-bottom: var(--color-field-active-border) solid 1px
    outline: none

</style>