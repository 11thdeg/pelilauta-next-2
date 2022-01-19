<script lang="ts" setup>
import NavButton from './NavButton.vue'
</script>
<template>
  <nav
    id="NavigationBar"
    class="onlyOnMobile"
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

<style lang="sass" scoped>
 #NavigationBar
  position: fixed
  bottom: 0
  left: 0
  width: 100vw
  background-color: var(--color-rise-a)
  box-shadow: 0px -2px 24px 0px rgba(0, 0, 0, 0.5)
</style>