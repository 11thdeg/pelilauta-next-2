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
import Banner from '../../components/navigation/Banner.vue'
import { useBanner } from '../../composables/useBanner'
import { NodeHtmlMarkdown } from 'node-html-markdown'
import YouTubeField from '../../components/content/YouTubeField.vue'
import { useRouter } from 'vue-router'
import { useSnack } from '../../composables/useSnack'

const props = defineProps<{
  threadid: string
}>()

const { t } = useI18n()
const { fetchThread, updateThread } = useThreads()
const { raise } = useBanner()
const nhm = new NodeHtmlMarkdown({}, undefined, undefined)
const router = useRouter()
const { pushSnack } = useSnack()

const thread = ref(new Thread())
const notFound = ref(false)
const preview = ref(false)
const showYoutube = ref(false)

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
    if (!tr.markdownContent && tr.htmlContent) {
      raise(t('thread.convert.warning'), convertThreadContentToMarkdown)
    }
  } else {
    notFound.value = true
  }
})

function convertThreadContentToMarkdown() {
  if (thread.value && !thread.value.markdownContent) thread.value.markdownContent = nhm.translate(thread.value.htmlContent)
  else throw new Error('PageEditView.convertPageContentToMarkdown: page.value.markdownContent is already set')
}

async function saveThread() {
  if (thread.value.markdownContent) thread.value.htmlContent = nhm.translate(thread.value.markdownContent)
  await updateThread(thread.value as Thread)
  pushSnack('snack.thread.saved')
  router.push(`/threads/${thread.value.key}`)
}

</script>

<template>
  <TopAppBar
    :title="t('editThread.title')"
    show-back-button
    sticky
  />
  <Banner />
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
          :disabled="showYoutube"
          text
          icon="youtube"
          @click="showYoutube = true"
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
      <YouTubeField
        v-model="thread.youtubeId"
        v-model:show="showYoutube"
      />
      <MarkdownArea
        v-model="thread.markdownContent"
        :preview="preview"
      />
      <ActionBar>
        <SpacerDiv />
        <Button
          text
          @click="$router.back()"
        >
          {{ t('actions.cancel') }}
        </Button>
        <Button
          icon="discussion"
          @click.prevent="saveThread"
        >
          {{ t('actions.save') }}
        </Button>
      </ActionBar>
    </template>
  </Main>
</template>