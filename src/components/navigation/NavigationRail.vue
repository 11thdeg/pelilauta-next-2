<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import NavButton from './NavButton.vue'
import SpacerDiv from '../ui/SpacerDiv.vue'
import AdminNavButton from './AdminNavButton.vue'
import AccountNavButton from './AccountNavButton.vue'

const t = useI18n().t
</script>

<template>
  <nav
    id="NavigationRail"
    class="hideOnMobile"
  >
    <NavButton
      icon="fox"
      label="Pelilauta"
      to="/"
    />
    <NavButton
      icon="discussion"
      :label="t('forum.title')"
      to="/forum"
      :active="$route.path === '/forum'"
    />
    <NavButton
      icon="mekanismi"
      :label="t('sites.title')"
      to="/sites"
      :active="$route.path.startsWith('/site')"
    />
    <SpacerDiv />
    <NavButton
      icon="stylebook"
      to="/stylebook"
      label="Stylebook"
      :active="$route.path.startsWith('/stylebook')"
    />
    <SpacerDiv />
    <AdminNavButton />
    <NavButton
      icon="assets"
      :label="t('assets.title')"
      to="/assets"
    />
    <AccountNavButton />
  </nav>
</template>

<style lang="sass">

nav#NavigationRail
  display: flex
  flex-direction: column
  align-items: center
  position: fixed
  top: 0px
  left: 0px
  width: 72px
  border-right: 1px solid var(--color-rise-a)
  height: 100vh
  z-index: var(--z-index-navigation)
  background-color: var(--color-navbar-background)
  padding-top: 0px
</style>