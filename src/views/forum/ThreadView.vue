<script lang="ts" setup>
import { Thread } from '@11thdeg/skaldstore'
import { computed, onMounted, ref } from 'vue'
import { useThreads } from '../../composables/useTheads'
import TopAppBar from '../../components/navigation/TopAppBar.vue'
import MarkDownSection from '../../components/ui/MarkDownSection.vue'
import ActionBar from '../../components/ui/ActionBar.vue'
import AuthorTag from '../../components/author/AuthorTag.vue'
import SpacerDiv from '../../components/ui/SpacerDiv.vue'
import SinceTag from '../../components/ui/SinceTag.vue'
import TopicTag from '../../components/threads/TopicTag.vue'
import ThreadMediaViewer from '../../components/threads/ThreadMediaViewer.vue'
import ThreadDiscussionColumn from '../../components/dicsussion/ThreadDiscussionColumn.vue'
import Column from '../../components/ui/Column.vue'
import LoveAThreadButton from '../../components/threads/LoveAThreadButton.vue'
import Button from '../../components/ui/Button.vue'
import { useI18n } from 'vue-i18n'
import ShareButton from '../../components/actions/ShareButton.vue'
import { useAccount } from '../../composables/useAccount'
import Main from '../../components/layout/Main.vue'
import WatchToggleButton from '../../components/threads/WatchToggleButton.vue'
import { useProfile } from '../../composables/useProfile'

const { t } = useI18n()
const { fetchThread } = useThreads()
const { account } = useAccount()

const props = defineProps<{
  threadid: string
}>()

const thread = ref<Thread|undefined>(undefined)
const title = computed<string>(() => thread.value?.title ? thread.value.title : '...')
const topic = computed(() => thread.value?.topicid ? thread.value.topicid : 'Yleinen')
const owns = computed(() => thread.value?.hasOwner(account.value.uid))

onMounted(async ()  => {
  thread.value = await fetchThread(props.threadid)
  if (!account.value.isAnonymous) {
    useProfile().watchThreadAt(props.threadid, thread.value?.flowTime ?? 0)  
  }
})
</script>

<template>
  <TopAppBar
    :title="title"
    sticky
  >
    <ShareButton />
    <Button
      v-if="owns"
      text
      icon="edit"
      @click.prevent="$router.push(`/threads/${props.threadid}/edit`)"
    >
      {{ t('actions.edit') }}
    </Button>
  </TopAppBar>
  <Main>
    <Column>
      <template v-if="thread">
        <h1>{{ thread.title }}</h1>
        <ActionBar>
          <AuthorTag :uid="thread.author" />
          <SpacerDiv />
          <SinceTag :time="thread.createdAt?.seconds" />
        </ActionBar>
        <ThreadMediaViewer :threadid="threadid" />
        <ActionBar>
          <TopicTag :slug="topic" />
          <SpacerDiv />
          <LoveAThreadButton
            v-if="thread"
            :thread="thread"
          />
        </ActionBar>
        <MarkDownSection
          v-if="thread.markdownContent"
          :content="thread.markdownContent"
        />
        <div
          v-else
          :innerHTML="thread.htmlContent"
        />
      </template>
      <ActionBar>
        <SpacerDiv />
        <WatchToggleButton
          v-if="thread"
          :thread="thread"
        />
      </ActionBar>
    </Column>
    <ThreadDiscussionColumn :threadid="threadid" />
  </Main>
</template>