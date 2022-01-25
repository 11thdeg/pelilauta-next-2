<script lang="ts" setup>
import { Ref, ref, watch } from 'vue'
import Button from '../ui/Button.vue'
import Dialog from '../ui/Dialog.vue'
import FileInput from './FileInput.vue';
import Textfield from '../ui/Textfield.vue';
import { FileData } from '../../utils/fileHelpers';
import Select from '../ui/Select.vue';
import { useAssets } from '../../stores/assets';
import { useSnack } from '../../composables/useSnack';

const dialog = ref(true)
const uploading = ref(false)

const fileName = ref('')
const description = ref('')
const license = ref('0')
const licenses = {
  '0': 'None',
  '1': 'CC-BY',
}

const { pushSnack } = useSnack()

const file:Ref<FileData|undefined> = ref(undefined)

watch(file, (newVal) => {
  if (newVal) {
    fileName.value = newVal.name
  }
})

function open () {
  file.value = undefined
  fileName.value = ''
  description.value = ''
  license.value = '0'
  dialog.value = true
}

async function upload () {
  uploading.value = true
  const assets = useAssets()
  if (file.value) {
    uploading.value = true
    await assets.uploadAsset(
      file.value.name,
      file.value.mimetype,
      file.value.dataURL
    )
    pushSnack('Asset uploaded')
  }
  uploading.value = false
  dialog.value = false
}

</script>

<template>
  <Button @click.prevent="open">
    Open
  </Button>
  <Dialog
    v-model="dialog"
    label="File upload dialog"
  >
    <div class="fileDataForm">
      <FileInput v-model:file="file" />
      <div class="fields">
        <Textfield
          v-model="fileName"
          label="Name"
        />
        <div v-if="file">
          <span class="code">{{ file.mimetype }}</span>
        </div>
        <Textfield
          v-model="description"
          label="Description"
        />
        <Select
          v-model="license"
          label="License"
          :options="licenses"
        />
      </div>
    </div>
    <div class="actions">
      <Button
        text
        @click="dialog = false"
      >
        Cancel
      </Button>
      <Button
        @click="upload"
        :working="uploading"
      >
        Upload
      </Button>
    </div>
  </Dialog>
</template>

<style lang="sass" scoped>
.fileDataForm
  display: flex
  gap: 12px
  .fields
    flex-grow: 1
    display: flex
    gap: 12px
    flex-direction: column
.actions
  width: 100%
  display: flex
  gap: 12px
  justify-content: flex-end
  margin-top: 12px
    
</style>