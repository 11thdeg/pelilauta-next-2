<script lang="ts" setup>
import Textfield from '../ui/Textfield.vue'
import Button from '../ui/Button.vue'
import { onMounted, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n'
import MarkdownArea from '../ui/MarkdownArea.vue'
import ImageList from '../ui/ImageList.vue';
import SelectImageDialog from '../assets/SelectImageDialog.vue';
import { useAssets } from '../../stores/assets';

const props = defineProps<{
  withImages: boolean
  withYoutube: boolean
}>()

const title = ref('')
const markdownContent = ref('')

const t = useI18n().t

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
    </div>

    <!-- YouTube sharing options -->
    <transition
      mode="out-in"
      enter-active-class="animate__animated animate__fadeIn"
      leave-active-class="animate__animated animate__fadeOut"
      :duration="200"
    >
      <div v-if="showYoutube || withYoutube">
        <Textfield v-model="youtubeId" />
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
    <Button text>
      {{ t('actions.cancel') }}
    </Button>
    <Button>{{ t('actions.add') }}</Button>

    <SelectImageDialog
      v-model="imageSelector"
      v-model:image="selectedImage"
    />
  </section>
</template>

<style lang="sass">
.topActions
  display: flex
</style>