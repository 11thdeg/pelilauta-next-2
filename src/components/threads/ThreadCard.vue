<script lang="ts" setup>
import { Thread } from '@11thdeg/skaldstore'
import { computed } from 'vue'
import Card from '../ui/Card.vue'
import MarkDownSection from '../ui/MarkDownSection.vue'
import YoutubePreview from '../ui/YoutubePreview.vue'
import ActionBar from '../ui/ActionBar.vue'
import AuthorTag from '../author/AuthorTag.vue'
import SinceTag from '../ui/SinceTag.vue'
import SpacerDiv from '../ui/SpacerDiv.vue'
import TopicTag from './TopicTag.vue'
import RepliesTag from './RepliesTag.vue'
import SiteLink from '../sites/SiteLink.vue'
import SiteAvatar from '../sites/SiteAvatar.vue'
import LoveAThreadButton from './LoveAThreadButton.vue'

const props = defineProps<{
  thread: Thread
  zipped? : boolean
}>()


const snippet = computed(() => {
  if (props.thread.markdownContent) return props.thread.markdownContent.slice(0, 240) + '...'
  const div = document.createElement('div')
      div.innerHTML = props.thread.htmlContent
      let snip = ''
      if (div.firstChild) {
        snip = div.firstChild.textContent || ''
        if (snip.length > 140) snip = snip.substring(0, 140) + '...'
      }
      return snip
})
</script>

<template>
  <Card
    rise-1
    class="ThreadCard"
  >
    <div class="cardHeader">
      <SiteAvatar
        v-if="thread.siteid"
        :siteid="thread.siteid"
      />
      <div class="cardHeaderText">
        <p
          v-if="thread.siteid"
          class="subtitle"
        >
          <SiteLink :siteid="thread.siteid" />
        </p>
        <h1>
          <router-link :to="`/threads/${thread.key}`">
            {{ thread.title }}
          </router-link>
        </h1>
      </div>
    </div>
    <hr v-if="zipped">
    <div v-if="!zipped">
      <template v-if="thread.youtubeId">
        <YoutubePreview
          :video-id="thread.youtubeId"
          :width="413+32"
          :height="275+(32/3*2)"
          style="margin: 12px -16px"
        />
      </template>
      <template v-else>
        <img
          v-if="thread.poster"
          class="poster"
          :src="thread.poster"
        >
        <MarkDownSection
          v-if="thread.markdownContent"
          :content="snippet"
          class="contentSnippet"
        />
        <p
          v-else
          class="contentSnippet TypeBody2"
        >
          {{ snippet }}
        </p>
      </template>
    </div>
    <ActionBar>
      <AuthorTag :uid="thread.author" />
      <SinceTag :time="thread.createdAt?.seconds" />
      <SpacerDiv />
    </ActionBar>
    <ActionBar>
      <LoveAThreadButton :thread="thread" />
      <TopicTag :slug="thread.topicid || ''" />
      <SpacerDiv />
      <RepliesTag :thread="thread" />
    </ActionBar>
  </Card>
</template>

<style lang="sass" scoped>
hr
  border: none
  border-top: var(--color-border) 1px solid !important
img.poster
  object-fit: cover
  width: calc(100% + 32px)
  max-height: 220px
  margin: 12px -16px
  border-top: solid 1px var(--chroma-secondary-d)
  border-bottom: solid 1px var(--chroma-secondary-d)
div.cardHeader
  display: flex
  gap: var(--page-column-gap)
  margin-top: 4px
  align-items: flex-start
    
</style>