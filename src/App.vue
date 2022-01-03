<script lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import LoadingScreen from '@/components/app/LoadingScreen.vue'
import { useStore } from './stores/main'
import { computed, defineComponent } from 'vue'

export default defineComponent({
  components: { HelloWorld, LoadingScreen },
  setup() {
    const state = useStore()
    const init = computed(() => state.initialized)
    return {
      init
    }
  },
})
</script>

<template>
  <transition mode="out-in" leave-active-class="animate__animated animate__fadeOut">
    <div v-if="!init">
      <LoadingScreen />
    </div>
  </transition>
  <template v-if="init">
    <HelloWorld msg="Charna + Pelilauta @ Next – prototype" />
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
