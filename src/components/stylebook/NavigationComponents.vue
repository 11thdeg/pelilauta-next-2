<script lang="ts" setup>
import NavButton from '../navigation/NavButton.vue'
</script>

<template>
  <cyan-column>
    <h1>Navigation</h1>
    <div class="flexList">
      <NavButton
        icon="fox"
        label="Pelilauta"
        to="/"
      >
        Home
      </NavButton>
      <NavButton
        icon="d6"
        label="About"
        to="/about"
      >
        About
      </NavButton>
      <NavButton
        icon="stylebook"
        to="/stylebook"
        label="Stylebook"
      >
        Stylebook
      </NavButton>
    </div>
  </cyan-column>
</template>

<style scoped>
div.flexList {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin-bottom: 24px;
  gap: 4px
}
</style>