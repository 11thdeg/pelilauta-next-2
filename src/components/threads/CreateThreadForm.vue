<script lang="ts" setup>
import Textfield from '../ui/Textfield.vue'
import Button from '../ui/Button.vue'
import { ref } from 'vue';
import { useI18n } from 'vue-i18n'
import MarkdownArea from '../ui/MarkdownArea.vue'

const title = ref('')
const markdownContent = ref('')

const t = useI18n().t

const preview = ref(false)

const showYoutube = ref(false)
const youtubeId = ref('')

</script>

<template>
  <section class="CreateThreadForm">
    <Textfield v-model="title" />
    <div
      class="topActions"
      icon="youtube"
    >
      <Button
        v-if="!preview"
        text
        icon="eye"
        @click="preview = true"
      >
        {{ t('createThread.actions.preview') }}
      </Button>
      <Button
        v-if="preview"
        text
        icon="edit"
        @click="preview = false"
      >
        {{ t('actions.edit') }}
      </Button>
      <div style="flex-grow: 1" />
      <Button
        text
        icon="youtube"
        @click="showYoutube = !showYoutube"
      >
        {{ t('createThread.actions.addVideo') }}
      </Button>
      <Button
        text
        icon="assets"
      >
        {{ t('createThread.actions.addImages') }}
      </Button>
    </div>
    <transition
      mode="out-in"
      enter-active-class="animate__animated animate__fadeIn"
      leave-active-class="animate__animated animate__fadeOut"
      :duration="200"
    >
      <div v-if="showYoutube">
        <Textfield v-model="youtubeId" />
      </div>
    </transition>
    <MarkdownArea
      v-model="markdownContent"
      :preview="preview"
    />
    <Button text>
      {{ t('actions.cancel') }}
    </Button>
    <Button>{{ t('actions.add') }}</Button>
  </section>
</template>

<style lang="sass">
.topActions
  display: flex
</style>