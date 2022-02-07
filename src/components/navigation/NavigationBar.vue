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
      icon="d6"
      :label="t('discourse.title')"
      to="/discourse"
    />
    <NavButton
      icon="d6"
      :label="t('sites.title')"
      to="/sites"
    />
    <NavButton
      icon="d6"
      :label="t('characters.title')"
      to="/discourse"
    />
    <NavButton
      icon="stylebook"
      to="/stylebook"
      label="Stylebook"
    />
  </nav>
</template>

<style lang="sass" scoped>
 #NavigationBar
  position: fixed
  bottom: 0
  left: 0
  width: 100vw
  display: flex
  margin: 0
  padding: 0 8px
  justify-content: space-between
  box-sizing: border-box
  background-color: var(--color-navbar-background)
  &.withFabs
    clip-path: polygon(0 0, calc(100% - 76px) 0, calc(100% - 64px) 8px, calc(100% - 24px) 8px, calc(100% - 12px) 0, 100% 0, 100% 100%, 0 100%)
</style>