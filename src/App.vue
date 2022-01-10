<script lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import LoadingScreen from '@/components/app/LoadingScreen.vue'
import { computed, defineComponent } from 'vue'
import LoginButton from './components/account/LoginButton.vue'
import LogoutButton from './components/account/LogoutButton.vue'
import { useAuthz } from './stores/authz'
import { useStore } from './stores/main'
import NavigationRail from './components/navigation/NavigationRail.vue'

export default defineComponent({
  components: { HelloWorld, LoadingScreen, LoginButton, LogoutButton, NavigationRail },
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
    <router-view />
  </template>
</template>

<style lang="sass">
@use './styles/color-themes.sass'
@use './styles/app.sass'

#app
  font-family: Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center

img#logo
  width: 256px
  background-color: #002337
  border-radius: 50%
</style>
