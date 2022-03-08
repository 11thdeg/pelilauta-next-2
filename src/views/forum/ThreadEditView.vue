<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import TopAppBar from '../../components/navigation/TopAppBar.vue'
import Main from '../../components/layout/Main.vue'
import { Thread } from '@11thdeg/skaldstore'
import { computed, onMounted, ref } from 'vue'
import Loader from '../../components/ui/Loader.vue'
import { useThreads } from '../../composables/useTheads'
import Textfield from '../../components/ui/Textfield.vue'
import ActionBar from '../../components/ui/ActionBar.vue'
import TopicSelector from '../../components/threads/TopicSelector.vue'
import SpacerDiv from '../../components/ui/SpacerDiv.vue'
import Button from '../../components/ui/Button.vue'
import MarkdownArea from '../../components/ui/MarkdownArea.vue'

const props = defineProps<{
  threadid: string
}>()

const { t } = useI18n()
const { fetchThread } = useThreads()

const thread = ref(new Thread())
const notFound = ref(false)
const preview = ref(false)

const loading = computed(() => !(thread.value.title || notFound.value))
const topic = computed({
  get: () => thread.value.topicid || 'Yleinen',
  set: (v) => {
    thread.value.topicid = v
  }
})

onMounted(async () => {
  const tr = await fetchThread(props.threadid)
  if (tr) {
    thread.value = tr
  } else {
    notFound.value = true
  }
})

</script>

<template>
  <TopAppBar
    :title="t('editThread.title')"
    show-back-button
    sticky
  />
  <Main>
    <Loader v-if="loading" />
    <template v-if="!loading && notFound">
      <h1>{{ t('editThread.notFound') }}</h1>
    </template>
    <template v-if="!loading && !notFound">
      <Textfield
        v-model="thread.title"
        :label="t('thread.fields.title')"
      />
      <ActionBar>
        <TopicSelector v-model="topic" />
        <Button
          v-if="!preview"
          text
          icon="eye"
          @click="preview = true"
        >
          {{ t('createThread.actions.preview') }}
        </Button>
        <Button
          v-else
          text
          icon="edit"
          @click="preview = false"
        >
          {{ t('actions.edit') }}
        </Button>
        <SpacerDiv />
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
      </ActionBar>
      <MarkdownArea
        v-model="thread.markdownContent"
        :preview="preview"
      />
      <ActionBar>
        <SpacerDiv />
        <Button text>
          {{ t('actions.cancel') }}
        </Button>
        <Button
          icon="discussion"
        >
          {{ t('actions.save') }}
        </Button>
      </ActionBar>
    </template>
  </Main>
</template>