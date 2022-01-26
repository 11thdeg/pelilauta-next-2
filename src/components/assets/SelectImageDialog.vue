<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useAssets } from '../../stores/assets';
import { logDebug } from '../../utils/loghelpers';
import Dialog from '../ui/Dialog.vue'
import ImageList from '../ui/ImageList.vue';
import Button from '../ui/Button.vue';

const props = defineProps<{
  modelValue:boolean,
  image: string
  }>()
const emit = defineEmits<{
  (e: 'update:modelValue', modelValue: boolean): void
  (e: 'update:image', selected: string): void
}>()

const open = computed({
  get: () => props.modelValue,
  set: (value:boolean) => {
    emit('update:modelValue', value)
  }
})

const assetStore = useAssets()

const assetList = computed(() => {
  logDebug('ImageList', 'assetList', assetStore.assets)
  const assets = assetStore.assets
  const list:Map<string, string> = new Map()
  assets.forEach((a, key) => {
    list.set(key, a.url || '')
  })
  return list
})

const selected = ref(props.image)

const selectedImage = computed({
  get: () => selected.value,
  set: (value:string) => {
    selected.value = value
  }
})

function select () {
  emit('update:image', selected.value)
  open.value = false
}
</script>

<template>
  <Dialog
    v-model="open"
    class="AssetListDialog"
    label="Select Image"
  >
    <div class="imageGrid">
      <ImageList
        v-model="selectedImage"
        :images="assetList"
      />
    </div>
    <div class="actions">
      <Button text @click="open = false">Close</Button>
      <Button @click="select">Select</Button>
    </div>
  </Dialog>
</template>

<style lang="sass" scoped>
.imageGrid
  display: flex
  gap: 4px
.assetImageContainer
  height: 72px
  width: 72px
  border-radius: 4px
  box-sizing: border-box
.assetImage
  height: 64px
  width: 64px
  border-radius: 4px
  padding: 4px
.selected
  background-color: var(--chroma-primary-f)
.actions
  display: flex
  gap: 4px
  justify-content: flex-end
</style>