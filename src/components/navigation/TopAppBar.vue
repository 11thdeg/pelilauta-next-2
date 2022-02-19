<script setup lang="ts">
import SpacerDiv from '../ui/SpacerDiv.vue'
import AvatarButton from '../account/AvatarButton.vue'
import LightmodeButton from '../app/LightmodeButton.vue'
import Icon from '../ui/Icon.vue';
import { version } from '../../../package.json'
import { useAuthz } from '../../stores/authz';
import { computed, onMounted, ref } from 'vue';
import HamburgerButton from './HamburgerButton.vue';

const props = defineProps<{
  title?: string,
  icon?: string,
  showBackButton?: boolean,
  sticky?: boolean
}>()

const authz = useAuthz()

const admin = computed(() => authz.isAdmin)

const overlay = ref(false)

onMounted(() => {
  if (props.sticky) {
    document.addEventListener('scroll', (e: Event) => {
      const top = window.pageYOffset || (e.target as HTMLElement).scrollTop || 0
      overlay.value = top > 2
    })
  }
})
</script>

<template>
  <nav
    id="TopAppBar"
    :class="{
      'sticky': sticky,
      'overlay': overlay,
      'rise-1': overlay
    }"
  >
    <HamburgerButton style="margin-top:12px"/>
    <h1>
      <Icon
        v-if="showBackButton"
        icon="back"
        class="hoverable clickable"
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
      class="TypeCaption hideOnMobile"
      style="line-height: 48px;padding-top:8px"
    >
      {{ version }}
    </p>  
    <LightmodeButton class="hideOnMobile" />
    <div
      class="AdminButton hoverable clickable"
      style="margin: calc((64px - 36px) / 2) 0"
      @click="$router.push('/admin')"
    >
      <Icon
        v-if="admin"
        icon="admin"
      />
    </div>
    <AvatarButton class="hideOnMobile" />
  </nav>
</template>

<style lang="sass" scoped>
nav#TopAppBar
  display: flex
  gap: 24px
  margin: 0
  padding: 0 16px
  height: 64px
  border-bottom: 1px solid var(--color-navbar-border)
  h1
    line-height: 64px
    font-size: 24px
    margin: 0
    padding: 0
    user-select: none
  &.sticky
    position: -webkit-sticky
    position: sticky
    top: 0px
    background-color: var(--color-background)
    z-index: 1000
    transition: all 0.2s ease-in-out
    margin-left: 1px
    &.overlay
      transition: all 0.6s ease-in-out
      box-shadow: 0px 0px 55px -12px var(--chroma-secondary-d)
</style>