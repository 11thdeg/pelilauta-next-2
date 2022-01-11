<script lang="ts">
import LoadingScreen from '@/components/app/LoadingScreen.vue'
import { computed, defineComponent } from 'vue'
import LoginButton from './components/account/LoginButton.vue'
import LogoutButton from './components/account/LogoutButton.vue'
import { useAuthz } from './stores/authz'
import { useStore } from './stores/main'
import NavigationRail from './components/navigation/NavigationRail.vue'
import TopAppBar from './components/navigation/TopAppBar.vue'

export default defineComponent({
  components: { LoadingScreen, LoginButton, LogoutButton, NavigationRail, TopAppBar },
  setup() {
    const session = useAuthz()
    const store = useStore()
    return {
      operational: computed(() => session.initialized),
      anonymous: computed(() => store.anonymous),
    }
  },
})
</script>

<template>
  <transition mode="out-in" leave-active-class="animate__animated animate__fadeOut">
    <div v-if="!operational">
      <LoadingScreen />
    </div>
  </transition>
  <template v-if="operational">
    <NavigationRail />
    <div id="AppContent">
      <TopAppBar />
      <main>
        <router-view />
      </main>
    </div>
  </template>
</template>

<style lang="sass">
@use './styles/color-themes.sass'
@use './styles/app.sass'
@import './styles/include-media.scss'

@include media('>=tablet')
  #AppContent
    box-model: border-box
    margin: 0
    padding: 0
    padding-left: 72px

#app
  font-family: Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  background-color: var(--color-background)
  min-height: 100vh
  min-width: 100vw

img#logo
  width: 256px
  background-color: #002337
  border-radius: 50%
</style>
