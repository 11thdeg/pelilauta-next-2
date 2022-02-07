<script setup lang="ts">
import NavigationComponents from '../components/stylebook/NavigationComponents.vue'
import StyleBookIntro from '../components/stylebook/StyleBookIntro.vue'
import TopAppBar from '../components/navigation/TopAppBar.vue'
import FormControls from '../components/stylebook/FormControls.vue'
import SnackbarTester from '../components/stylebook/SnackbarTester.vue'
import ButtonsAndActions from '../components/stylebook/ButtonsAndActions.vue'
import MarkdownAndSubthemes from '../components/stylebook/MarkdownAndSubthemes.vue'
import Iconography from '../components/stylebook/Iconography.vue'
import { computed } from 'vue'
import Cards from '../components/stylebook/Cards.vue'

const props = defineProps<{
  page?: string
}>()

const subPage = computed(() => props.page || '')
</script>

<template>
  <TopAppBar
    title="Stylebook"
    icon="mekanismi"
  />
  <main class="bookLayout">
    <StyleBookIntro v-if="!subPage" />
    <Iconography v-if="!subPage" />
    <FormControls v-if="!subPage || subPage === 'formcontrols' " />
    <Cards
      v-if="!subPage || subPage === 'cards' "
      class="double"
    />
    <MarkdownAndSubthemes
      v-if="!subPage"
      class="double"
    />
    <ButtonsAndActions v-if="!subPage" />
    <NavigationComponents
      v-if="!subPage"
      class="double"
    />
    <SnackbarTester v-if="!subPage" />
  </main>
</template>