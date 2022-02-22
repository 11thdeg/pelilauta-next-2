<script lang="ts" setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useStore } from '../../stores/main';
import NavButton from './NavButton.vue'

const store = useStore()

const withFabs = computed(() => (store.withFabs))

const t = useI18n().t
</script>
<template>
  <div
    id="NavigationBarShadow"
    class="onlyOnMobile"
  />
  <nav
    id="NavigationBar"
    class="onlyOnMobile"
    :class="{ withFabs: withFabs }"
  >
    <NavButton
      icon="fox"
      label="Pelilauta"
      to="/"
    />
    <NavButton
      icon="discussion"
      :label="t('discourse.title')"
      to="/discourse"
      disabled
    />
    <NavButton
      icon="mekanismi"
      :label="t('sites.title')"
      to="/sites"
    />
    <NavButton
      icon="adventurer"
      :label="t('characters.title')"
      to="/characters"
      disabled
    />
    <NavButton
      icon="avatar"
      to="/account"
      :label="t('account.title')"
    />
  </nav>
</template>

<style lang="sass" scoped>
 #NavigationBar
  position: fixed
  bottom: 0%
  left: 0
  width: 100vw
  display: flex
  margin: 0
  padding: 0 8px
  justify-content: space-between
  box-sizing: border-box
  background-color: var(--color-navbar-background)
  z-index: var(--z-index-navigation)
  &.withFabs
    clip-path: polygon(0 0, calc(100% - 76px) 0, calc(100% - 64px) 8px, calc(100% - 24px) 8px, calc(100% - 12px) 0, 100% 0, 100% 100%, 0 100%)
#NavigationBarShadow
  content: ''
  position: fixed
  bottom: 50px
  left: 0
  width: 100vw
  height: 32px
  z-index: calc(var(--z-index-navigation) - 10 )
  background: linear-gradient(0deg, rgba(0,35,55,1) 0%, rgba(0,35,55,0) 100%)
</style>