<script setup lang="ts">
import { computed } from 'vue';
import { useAuthz } from '../../stores/authz'
import LoginButton from '../account/LoginButton.vue'
import LogoutButton from '../account/LogoutButton.vue'
import NavButton from '../ui/NavButton.vue';

const anonymous = computed(() => useAuthz().anonymous)
</script>

<template>
  <nav
    id="NavigationRail"
    class="hideOnMobile"
  >
    <NavButton
      icon="d12"
      label="Home"
      to="/"
    >
      Home
    </NavButton>
    <NavButton
      icon="d6"
      label="About"
      to="/about"
    >
      About
    </NavButton>
    <NavButton
      icon="stylebook"
      to="/stylebook"
      label="Stylebook"
    >
      Stylebook
    </NavButton>
    <p>...</p>
    <LoginButton v-if="anonymous" />
    <LogoutButton v-else />
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