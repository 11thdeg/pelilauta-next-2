<script setup lang="ts">
import SpacerDiv from '../ui/SpacerDiv.vue'
import LightmodeButton from '../app/LightmodeButton.vue'
import Icon from '../ui/Icon.vue'
import { version } from '../../../package.json'
import { computed, onMounted, ref } from 'vue'
import HamburgerButton from './HamburgerButton.vue'
import { useUxState } from '../../composables/useUxState'
import NotificationsButton from '../notifications/NotificationsButton.vue'

const props = defineProps<{
  title?: string,
  icon?: string,
  showBackButton?: boolean,
  sticky?: boolean
}>()

const overlay = ref(false)

onMounted(() => {
  if (props.sticky) {
    document.addEventListener('scroll', (e: Event) => {
      const top = window.pageYOffset || (e.target as HTMLElement).scrollTop || 0
      overlay.value = top > 2
    })
  }
})

const uxState = useUxState()
const hamburgerPadded = computed(() => uxState.navTrayVisible.value)

</script>

<template>
  <nav
    id="TopAppBar"
    :class="{
      'sticky': sticky,
      'overlay': overlay,
      'rise-1': overlay && !showBackButton,
      'rise-2': showBackButton,
    }"
  >
    <HamburgerButton style="margin-top:12px" />
    <h1 :class="{ hamburgerPadded: hamburgerPadded }">
      <Icon
        v-if="showBackButton"
        icon="back"
        class="hoverable clickable"
        @click.prevent="$router.back()"
      />
      <Icon
        v-if="icon"
        :icon="icon"
      />
      {{ props.title || 'Pelilauta' }}
    </h1>
    <SpacerDiv />
    <p
      v-if="!showBackButton"
      class="TypeCaption hideOnMobile"
      style="line-height: 48px;padding-top:6px; height: 48px; overflow: hidden;"
    >
      {{ version }}
    </p>  
    <LightmodeButton
      v-if="!showBackButton"
      class="hideOnMobile"
    />
    <NotificationsButton v-if="!showBackButton" />
    <slot />
  </nav>
</template>

<style lang="sass" scoped>
@import ../../styles/include-media.scss
nav#TopAppBar
  display: flex
  gap: 24px
  margin: 0
  padding: 0 16px
  height: 56px
  align-items: center
  h1
    line-height: 56px
    font-size: 24px
    margin: 0
    padding: 0
    user-select: none
    height: 48px
    line-height: 48px
    overflow: hidden
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
@include media('<=600px')
  nav#TopAppBar
    h1.hamburgerPadded
      padding-left: 48px
@media (prefers-color-scheme: light)
  nav#TopAppBar
    border-bottom: 1px solid var(--color-border)
    height: 55px
@media (prefers-color-scheme: dark)
  body.light-theme
    nav#TopAppBar
      border-bottom: 1px solid var(--color-border)
      height: 55px

</style>