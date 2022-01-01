<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <img alt="Charna logo" src="/proprietary/fox.svg" id="logo" />
  <HelloWorld msg="Charna + Pelilauta @ Next – prototype" />
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
