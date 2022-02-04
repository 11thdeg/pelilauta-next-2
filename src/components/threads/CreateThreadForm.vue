<script lang="ts" setup>
import { computed, onMounted, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n'
import Textfield from '../ui/Textfield.vue'
import Button from '../ui/Button.vue'
import MarkdownArea from '../ui/MarkdownArea.vue'
import ImageList from '../ui/ImageList.vue'
import SelectImageDialog from '../assets/SelectImageDialog.vue'
import { useAssets } from '../../stores/assets'
import { Thread } from '@11thdeg/skaldstore'
import TopicSelector from './TopicSelector.vue'
import { logDebug, logError } from '../../utils/loghelpers'
import ActionBar from '../ui/ActionBar.vue'
import SpacerDiv from '../ui/SpacerDiv.vue'
import { useAuthz } from '../../stores/authz'
import { addDoc, collection, getFirestore } from '@firebase/firestore'
import { useSnack } from '../../composables/useSnack';
import { useRouter } from 'vue-router';

const props = defineProps<{
  withImages: boolean
  withYoutube: boolean
}>()

const title = ref('')
const markdownContent = ref('')

const t = useI18n().t
const authz = useAuthz()

const preview = ref(false)

const showYoutube = ref(props.withYoutube)
const youtubeId = ref('')

const images = ref<Map<string, string>>(new Map())
const selectedImage = ref('')

const assetStore = useAssets()

onMounted(() => {
  watch(selectedImage, (value) => {
    if (!value) return
    images.value.set(value, assetStore.assets.get(value)?.url || '')
    selectedImage.value = ''
  })
})

const imageSelector = ref(false)

const topic = ref('')

function cancel () {
  title.value = ''
  markdownContent.value = ''
  images.value.clear()
  youtubeId.value = ''
  topic.value = ''
  preview.value = false
}

const { pushSnack } = useSnack()
const router = useRouter()

async function submit () {
  const thread = new Thread()
  thread.title = title.value
  thread.markdownContent = markdownContent.value
  thread.topicid = topic.value
  thread.author = authz.user.uid
  if (youtubeId.value) thread.youtubeId = youtubeId.value
  if (images.value.size) thread.assets = images.value
  logDebug('CreateThreadForm', 'submit', thread.docData)
  try {
    const threadid = await addDoc(
      collection(getFirestore(), 'stream'),
      thread.docData
    )
    pushSnack('thread.create.success')
    router.push('/thread/' + threadid)
  } catch (e) {
    pushSnack('thread.create.error')
    logError('CreateThreadForm', 'submit', e)
  }
}

const valid = computed(() => {
  return title.value.length > 0 && 
    markdownContent.value.length > 0
})

</script>

<template>
  <section class="CreateThreadForm">
    <Textfield
      v-model="title"
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
        @click="imageSelector = !imageSelector"
      >
        {{ t('createThread.actions.addImages') }}
      </Button>
    </ActionBar>

    <!-- YouTube sharing options -->
    <transition
      mode="out-in"
      enter-active-class="animate__animated animate__fadeIn"
      leave-active-class="animate__animated animate__fadeOut"
      :duration="200"
    >
      <div v-if="showYoutube || withYoutube">
        <Textfield
          v-model="youtubeId"
          :label="t('thread.fields.youtubeId')"
        />
      </div>
    </transition>

    <!-- Image sharing options -->
    <transition
      mode="out-in"
      enter-active-class="animate__animated animate__fadeIn"
      leave-active-class="animate__animated animate__fadeOut"
      :duration="200"
    >
      <ImageList
        v-if="images.size > 0"
        v-model="selectedImage"
        :images="images"
      />
    </transition>

    <MarkdownArea
      v-model="markdownContent"
      :preview="preview"
    />

    <ActionBar>
      <SpacerDiv />
      <Button
        text
        @click="cancel"
      >
        {{ t('actions.cancel') }}
      </Button>
      <Button
        :disabled="!valid"
        @click="submit"
      >
        {{ t('actions.add') }}
      </Button>

      <SelectImageDialog
        v-model="imageSelector"
        v-model:image="selectedImage"
      />
    </ActionBar>
  </section>
</template>

<style lang="sass">
.CreateThreadForm
  display: flex
  flex-direction: column
  gap: var(--page-grid-gap)

</style>