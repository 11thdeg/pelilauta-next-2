<script lang="ts" setup>
import LoadingScreen from '@/components/app/LoadingScreen.vue'
import { computed } from 'vue'
import { useAuthz } from './stores/authz'
import NavigationRail from './components/navigation/NavigationRail.vue'
import Snackbar from './components/app/Snackbar.vue'
import { useStore } from './stores/main'

const { initAppMeta } = useStore()
initAppMeta()

const auth = useAuthz()
const operational = computed(() => auth.initialized)

</script>

<template>
  <transition
    mode="out-in"
    leave-active-class="animate__animated animate__fadeOut"
    :duration="200"
  >
    <div v-if="!operational">
      <LoadingScreen />
    </div>
  </transition>
  <template v-if="operational">
    <NavigationRail />
    <div id="AppContent">
      <main>
        <router-view />
      </main>
    </div>
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
