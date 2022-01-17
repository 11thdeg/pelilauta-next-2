<script setup lang="ts">
import Button from '../components/ui/Button.vue'
import NavigationComponents from '../components/stylebook/NavigationComponents.vue'
import Loader from '../components/ui/Loader.vue'
import Column from '../components/ui/Column.vue'
import StyleBookIntro from '../components/stylebook/StyleBookIntro.vue'
import TopAppBar from '../components/navigation/TopAppBar.vue'
import FormControls from '../components/stylebook/FormControls.vue'
import SnackbarTester from '../components/stylebook/SnackbarTester.vue'
import ButtonsAndActions from '../components/stylebook/ButtonsAndActions.vue'
</script>

<template>
  <TopAppBar
    title="Stylebook"
    icon="mekanismi"
  />
  <main class="bookLayout">
    <StyleBookIntro />
    <FormControls />
    <ButtonsAndActions />
    <NavigationComponents class="double" />
    <SnackbarTester />
  </main>
</template>