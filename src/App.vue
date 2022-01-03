<script lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import { useStore } from './stores/main'
import { computed, defineComponent } from 'vue'

export default defineComponent({
  components: { HelloWorld },
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
  <img alt="Charna logo" src="/proprietary/fox.svg" id="logo" />
  <template v-if="init">
    <HelloWorld msg="Charna + Pelilauta @ Next – prototype" />
    <router-view />
  </template>
  <div v-else>
    <p>Loading...</p>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
img#logo {
  width: 256px;
  margin: 0 auto;
  background-color: #002337;
  border-radius: 50%;
}
</style>
