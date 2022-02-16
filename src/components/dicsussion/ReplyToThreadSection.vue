<script lang="ts" setup>
import { Reply } from '@11thdeg/skaldstore';
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n'
import { logDebug, logError } from '../../utils/loghelpers';
import MarkdownArea from '../ui/MarkdownArea.vue';
import ActionBar from '../ui/ActionBar.vue';
import SpacerDiv from '../ui/SpacerDiv.vue';
import Button from '../ui/Button.vue';
import { useAuthz } from '../../stores/authz';
import { collection, getFirestore, addDoc, updateDoc, doc, serverTimestamp, increment } from '@firebase/firestore'
import { useSnack } from '../../composables/useSnack';
import { marked } from 'marked';

const t = useI18n().t
const user = useAuthz().user
const uid = computed(() => user?.uid || '')
const { pushSnack } = useSnack()

const reply = ref(new Reply())

const props = defineProps<{
  threadid: string
}>()

function onCancel () {
  reply.value = new Reply()
}

async function onSubmit () {
  reply.value.author = uid.value
  reply.value.htmlContent = marked(reply.value.markdownContent)
  const data = reply.value.docData
  data.created = data.createdAt // TODO: remove this after migration
  logDebug('onSubmit', data)
  try {
    await addDoc(
      collection(
        getFirestore(),
        'stream',
        props.threadid,
        'comments'
      ),
      data
    )
    logDebug('updating thread fields by the client, this should be moved to cloud-side for cIA purposes')
    await updateDoc(
      doc(
        getFirestore(),
        'stream',
        props.threadid
      ),
      {
        flowTime: serverTimestamp(),
        replyCount: increment(1)
      }
    )
    pushSnack('snacks.reply.success')
    onCancel()
  } catch (e) {
    pushSnack('snacks.reply.error')
    logError(e)
  }
}

logDebug('ThreadDiscussionColumn.vue: threadid=', props.threadid)
</script>

<template>
  <section>
    <h4>{{ t('reply.title') }}</h4>
    <MarkdownArea
      v-model="reply.markdownContent"
      collapsed
    />
    <ActionBar>
      <SpacerDiv />
      <Button
        text
        @click.prevent="onCancel"
      >
        {{ t('actions.cancel') }}
      </Button>
      <Button @click.prevent="onSubmit">
        {{ t('actions.send') }}
      </Button>
    </ActionBar>
  </section>
</template>