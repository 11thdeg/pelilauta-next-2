<script lang="ts" setup>
import { computed, ref } from "vue"
import { useAssets } from "../../stores/assets"
import SelectImageDialog from "../assets/SelectImageDialog.vue"

const assetsStore = useAssets()

const imageUrl = computed(() => assetsStore.assets.get(selectedImage.value)?.url || props.modelValue || '')

const selectDialogOpen = ref(false)
const selected = ref('')

const props = defineProps<{
  modelValue:string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', modelValue: string): void
}>()

const selectedImage = computed({
  get: () => selected.value,
  set: (value:string) => {
    selected.value = value
    emit('update:modelValue', assetsStore.assets.get(selectedImage.value)?.url || '')
  }
 })


</script>

<template>
  <div class="AvatarSwitcher">
    <img
      :src="imageUrl"
      alt="Avatar Image"
    >
    <img
      src="/proprietary/icons/dark/assets.svg"
      alt="change"
      class="hoverIcon"
      @click="selectDialogOpen = true"
    >
    <SelectImageDialog
      v-model="selectDialogOpen"
      v-model:image="selectedImage"
    />
  </div>
</template>

<style lang="sass" scoped>
.AvatarSwitcher
  height: 72px
  width: 72px
  box-sizing: border-box
  position: relative
  img
    height: 72px
    width: 72px
    border-radius: 36px
    object-fit: cover
  img.hoverIcon
    position: absolute
    top: 8px
    left: 8px
    border-radius: 0
    height: 56px
    width: 56px
    opacity: 0
    transition: opacity 0.2s ease-in-out
    &:hover
      opacity: 0.5
    
</style>