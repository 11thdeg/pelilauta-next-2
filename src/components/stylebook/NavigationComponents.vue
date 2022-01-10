<script lang="ts" setup>
import Column from '../ui/Column.vue'
import NavButton from '../ui/NavButton.vue';
</script>

<template>
  <Column>
    <h1>Navigation</h1>
    <div class="flexList">
      <NavButton icon="d12" label="Home" to="/">Home</NavButton>
      <NavButton icon="d6" label="About" to="/about">About</NavButton>
      <NavButton icon="stylebook" to="/stylebook" label="Stylebook">Stylebook</NavButton>
    </div>
  </Column>
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