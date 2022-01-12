<script lang="ts" setup>
import Loader from '../ui/Loader.vue';

</script>
<template>
  <div id="LoadingScreen">
    <div
      id="SiteLogoContainer"
      class="chroma-box-2"
    >
      <img
        id="logo"
        alt="Charna logo"
        src="/proprietary/fox.svg"
      >
    </div>
    <div id="Loading">
      <Loader />
    </div>
  </div>
</template>

<style lang="sass">
div#LoadingScreen
  position: fixed
  top: 0
  left: 0
  width: 100vw
  height: 100vw
  box-sizing: border-box
  background-color: var(--chroma-primary-a)
  background: linear-gradient(11deg, var(--chroma-secondary-a) 0%, var(--chroma-secondary-b) 100%)  
  div#SiteLogoContainer
    height: min(256px, 80vw)
    width: min(256px, 80vw)
    border-radius: 50%
    overflow: visible
    margin: 0 auto
    margin-top: 64px
  div#Loading
    margin: 72px auto
    width: 128px
  img#logo
    width: 110%
    margin-left: -5%
    -webkit-filter: drop-shadow( 0px 0px 16px rgba(#002337, .5))
    filter: drop-shadow( 0px 0px 16px rgba(#002337, .5))
</style>
