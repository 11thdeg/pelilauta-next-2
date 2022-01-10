<script setup lang="ts">
import { computed } from 'vue';
import { useAuthz } from '../../stores/authz'
import LoginButton from '../account/LoginButton.vue'
import LogoutButton from '../account/LogoutButton.vue'

const anonymous = computed(() => useAuthz().anonymous)
</script>

<template>
  <nav id="NavigationRail" class="hideOnMobile">
    <router-link to="/">Home</router-link>
    <router-link to="/stylebook">Stylebook</router-link>
    <router-link to="/about">About</router-link>
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
  top: 16px
  left: 16px
</style>