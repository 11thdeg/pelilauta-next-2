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
        icon="eye-slash"
        @click="preview = false"
      >
        {{ t('createThread.actions.hidepreview') }}
      </Button>
      <Button
        text
        icon="youtube"
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