<script setup lang="ts">
import SpacerDiv from '../ui/SpacerDiv.vue'
import AvatarButton from '../account/AvatarButton.vue'
import LightmodeButton from '../app/LightmodeButton.vue'
import Icon from '../ui/Icon.vue';
import { version } from '../../../package.json'

const props = defineProps<{
  title?: string,
  icon?: string,
  showBackButton?: boolean,
}>()
</script>

<template>
  <nav id="TopAppBar">
    <h1>
      <Icon
        v-if="showBackButton"
        icon="arrow_back"
        @click.prevent="$router.back()"
      />
      <Icon
        v-if="icon"
        :icon="icon"
        class="inTopBar"
      />
      {{ props.title || 'Pelilauta' }}
    </h1>
    <SpacerDiv />
    <p
      class="TypeCaption"
      style="line-height: 48px;padding-top:8px"
    >
      {{ version }}
    </p>
    <LightmodeButton />
    <AvatarButton />
  </nav>
</template>

<style lang="sass" scoped>
nav#TopAppBar
  display: flex
  gap: 24px
  margin: 0
  padding: 0 16px
  height: 64px
  h1
    line-height: 48px
    font-size: 24px
    margin: 0
    padding: 0
</style>