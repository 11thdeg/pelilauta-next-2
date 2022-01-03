<template>
  <div id="LoadingScreen">
    <img alt="Charna logo" src="/proprietary/fox.svg" id="logo" />
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
  background-color: var(--color-background)
  img#logo
    width: 256px
    margin: 20vw auto
    background-color: #002337
    border-radius: 50%
</style>
