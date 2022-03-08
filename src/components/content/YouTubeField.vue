<script lang="ts" setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import ActionBar from '../ui/ActionBar.vue'
import Textfield from '../ui/Textfield.vue'
import YoutubePreview from '../ui/YoutubePreview.vue'
import Icon from '../ui/Icon.vue'

const props = defineProps<{
  modelValue?: string
  show?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', modelValue: string): void
  (e: 'update:show', show: boolean): void
}>()

const { t } = useI18n()

const visible = computed(() => props.show || props.modelValue)
const slug = computed({
  get: () => props.modelValue || '',
  set: (value?: string) => {
    emit('update:modelValue', value || '')
  }
})

function remove () {
  emit('update:modelValue', '')
  emit('update:show', false)
}

</script>

<template>
  <div class="YouTubeField">
    <transition
      mode="out-in"
      enter-active-class="animate__animated animate__fadeIn"
      leave-active-class="animate__animated animate__fadeOut"
      :duration="200"
    >
      <ActionBar v-if="visible">
        <Textfield
          v-model="slug"
          :label="t('thread.fields.youtubeId')"
          style="flex-grow: 1"
        />
        <YoutubePreview
          :video-id="slug"
          :width="84"
          :height="56"
        />
        <Icon
          icon="delete"
          class="hoverable clickable"
          @click="remove"
        />
      </ActionBar>
    </transition>
  </div>
</template>

<style scoped>
div.YouTubeField {
  display: inline-block;
}
</style>