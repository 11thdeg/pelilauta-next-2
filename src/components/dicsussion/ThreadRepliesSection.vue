<script lang="ts" setup>
import { Reply, Thread } from '@11thdeg/skaldstore';
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { collection, getFirestore, onSnapshot } from '@firebase/firestore'
import { marked } from 'marked';
import MarkDownSection from '../ui/MarkDownSection.vue';
import SinceTag from '../ui/SinceTag.vue';
import AuthorTag from '../author/AuthorTag.vue';
import { useAuthz } from '../../stores/authz';
import ActionBar from '../ui/ActionBar.vue';
import SpacerDiv from '../ui/SpacerDiv.vue';

const props = defineProps<{
  threadid: string
}>()

const replies = ref(new Array<Reply>())
const user = useAuthz().user
const uid = computed(() => user?.uid)

let unsubscribeToDiscussion:undefined|CallableFunction = undefined

onMounted(async () => {
  unsubscribeToDiscussion = onSnapshot(
    collection(
      getFirestore(),
      'stream',
      props.threadid,
      'comments'
    ), 
    async (snapshot) => {
      if (snapshot.empty) {
        return
      }
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
          replies.value.push(new Reply(change.doc.data(), change.doc.id))
        }
      })
    })
})
onUnmounted(() => {
  if (unsubscribeToDiscussion) {
    unsubscribeToDiscussion()
  }
})
</script>

<template>
  <section>
    <div
      v-for="reply in replies"
      :key="reply.key"
      class="reply"
      :class="{ fromMe: reply.author === uid }"
    >
      <ActionBar>
        <AuthorTag :uid="reply.author" />
        <SpacerDiv />
        <SinceTag :time="reply.createdAt" />
      </ActionBar>
      <MarkDownSection
        v-if="reply.markdownContent"
        :content="reply.markdownContent"
      />
      <div
        v-else
        :innerHTML="reply.htmlContent"
      />
    </div>
  </section>
</template>

<style lang="sass">
.reply
  background-color: var(--chroma-secondary-b)
  padding: 12px 8px
  border-radius: 8px
  &.fromMe
    background-color: var(--chroma-primary-a)
    border: solid 1px var(--chroma-primary-e)
</style>