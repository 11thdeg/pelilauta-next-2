<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useAssets } from '../../stores/assets';
import Dialog from '../ui/Dialog.vue'

const props = defineProps<{
  modelValue:boolean
  }>()
const emit = defineEmits<{
  (e: 'update:modelValue', modelValue: boolean): void
}>()

const open = computed({
  get: () => props.modelValue,
  set: (value:boolean) => {
    emit('update:modelValue', value)
  }
})

const assetStore = useAssets()
const assetList = computed(() => assetStore.assets)

const selected = ref('')
</script>

<template>
  <Dialog
    v-model="open"
    class="AssetListDialog"
    label="Select Image"
  >
    <div class="imageGrid">
      <div
        v-for="asset in assetList"
        :key="asset[0]"
        class="assetImageContainer"
        :class="{ selected: selected === asset[0] }"
        @click="selected = asset[0]"
      >
        <img
          class="assetImage"
          :src="asset[1].url"
          :alt="asset[1].name"
        >
      </div>
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
</style>