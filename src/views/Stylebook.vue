<script setup lang="ts">
import NavigationComponents from '../components/stylebook/NavigationComponents.vue'
import StyleBookIntro from '../components/stylebook/StyleBookIntro.vue'
import TopAppBar from '../components/navigation/TopAppBar.vue'
import FormControls from '../components/stylebook/FormControls.vue'
import SnackbarTester from '../components/stylebook/SnackbarTester.vue'
import ButtonsAndActions from '../components/stylebook/ButtonsAndActions.vue'
import MarkdownAndSubthemes from '../components/stylebook/MarkdownAndSubthemes.vue'
import Iconography from '../components/stylebook/Iconography.vue'
</script>

<template>
  <TopAppBar
    title="Stylebook"
    icon="mekanismi"
  />
  <main class="bookLayout">
    <StyleBookIntro />
    <Iconography />
    <FormControls />
    <MarkdownAndSubthemes class="double" />
    <ButtonsAndActions />
    <NavigationComponents class="double" />
    <SnackbarTester />
  </main>
</template>