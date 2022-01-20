<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import NavButton from './NavButton.vue'

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
      icon="d6"
      label="About"
      to="/about"
    />
    <NavButton
      icon="assets"
      :label="t('assets.title')"
      to="/assets"
    />
    <NavButton
      icon="stylebook"
      to="/stylebook"
      label="Stylebook"
    />
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
</style>