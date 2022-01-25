<script lang="ts" setup>
import { computed, ref } from "vue"
import { useProfile } from "../../stores/profile"
import SelectImageDialog from "../assets/SelectImageDialog.vue";

const profileStore = useProfile()

const imageUrl = computed(() => profileStore.profile.avatarURL || '')

const selectDialogOpen = ref(false)
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
    <SelectImageDialog v-model="selectDialogOpen" />
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