<script setup lang="ts">
import NavigationComponents from '../components/stylebook/NavigationComponents.vue'
import StyleBookIntro from '../components/stylebook/StyleBookIntro.vue'
import TopAppBar from '../components/navigation/TopAppBar.vue'
import FormControls from '../components/stylebook/FormControls.vue'
import SnackbarTester from '../components/stylebook/SnackbarTester.vue'
import ButtonsAndActions from '../components/stylebook/ButtonsAndActions.vue'
import MarkdownAndSubthemes from '../components/stylebook/MarkdownAndSubthemes.vue'
</script>

<template>
  <TopAppBar
    title="Stylebook"
    icon="mekanismi"
  />
  <main class="bookLayout">
    <StyleBookIntro />
    <FormControls />
    <MarkdownAndSubthemes class="double" />
    <ButtonsAndActions />
    <NavigationComponents class="double" />
    <SnackbarTester />
  </main>
</template>