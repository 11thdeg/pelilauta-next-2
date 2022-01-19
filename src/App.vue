<script lang="ts" setup>
import LoadingScreen from '@/components/app/LoadingScreen.vue'
import { computed } from 'vue'
import { useAuthz } from './stores/authz'
import NavigationRail from './components/navigation/NavigationRail.vue'
import Snackbar from './components/app/Snackbar.vue'
import { useStore } from './stores/main'
import NavigationBar from './components/navigation/NavigationBar.vue'

const { initAppMeta } = useStore()
initAppMeta()

const auth = useAuthz()
const showLoadingScreen = computed(() => !auth.operational)

</script>

<template>
  <transition
    mode="out-in"
    leave-active-class="animate__animated animate__fadeOut"
    :duration="200"
  >
    <div v-if="showLoadingScreen">
      <LoadingScreen />
    </div>
  </transition>
  <template v-if="!showLoadingScreen">
    <div id="AppContent">
      <router-view />
    </div>
    <NavigationRail />
    <NavigationBar />
  </template>
  <Snackbar />
</template>

<style lang="sass">
@use './styles/color-themes.sass'
@import './styles/app.sass'
@import './styles/include-media.scss'

@include media('>=tablet')
  #AppContent
    box-model: border-box
    margin: 0
    padding: 0
    padding-left: 72px

#app
  background-color: var(--color-background)
  min-height: 100vh
  min-width: 100vw
</style>
