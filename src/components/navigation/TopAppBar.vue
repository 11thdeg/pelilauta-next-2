<script setup lang="ts">
import { computed } from 'vue';
import { useAuthz } from '../../stores/authz';
import SpacerDiv from '../ui/SpacerDiv.vue';
import LoginButton from '../account/LoginButton.vue';
import AvatarButton from '../account/AvatarButton.vue';
import LightmodeButton from '../app/LightmodeButton.vue';
import Icon from '../ui/Icon.vue';
const anonymous = computed(() => useAuthz().anonymous)

const props = defineProps<{
  title?: string;
  icon?: string;
}>()
</script>

<template>
  <nav id="TopAppBar">
    <h1>
      <Icon
        v-if="icon"
        :icon="icon"
        class="inTopBar"
      />
      {{ props.title || 'Pelilauta' }}
    </h1>
    <SpacerDiv />
    <LoginButton v-if="anonymous" />
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