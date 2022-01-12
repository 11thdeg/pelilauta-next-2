<script setup lang="ts">
import NavButton from './NavButton.vue';
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