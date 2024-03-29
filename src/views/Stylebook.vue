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
import Banner from '../components/navigation/Banner.vue'
import NavigationTray from '../components/navigation/NavigationTray.vue'
import { useRoute } from 'vue-router'
import TrayButton from '../components/navigation/tray/TrayButton.vue'

const props = defineProps<{
  page?: string
}>()

const route = useRoute()

const subPage = computed(() => props.page || '')

const laytoutClass = computed(() => {
  if (route.fullPath === '/stylebook') {
    return 'bookLayout'
  }
  return 'singleColumnLayout'
})
</script>

<template>
  <TopAppBar
    title="Stylebook"
    icon="mekanismi"
  />
  <Banner />
  <NavigationTray>
    <h3>
      <router-link to="/stylebook">
        Stylebook
      </router-link>
    </h3>
    <TrayButton
      to="/stylebook/iconography"
      label="Iconography"
      icon="stylebook"
    />
    <TrayButton
      to="/stylebook/formcontrols"
      label="Form Controls"
      icon="edit"
    />
    <TrayButton
      icon="delete"
      to="/stylebook/buttonsandactions"
      label="Buttons and Actions" 
    />
    <TrayButton
      icon="love"
      to="/stylebook/notifications"
      label="Notifications" 
    />
  </NavigationTray>
  <cyan-layout :class="laytoutClass">
    <StyleBookIntro v-if="!subPage" />
    <Iconography v-if="!subPage || subPage === 'iconography'" />
    <FormControls v-if="!subPage || subPage === 'formcontrols' " />
    <Cards
      v-if="!subPage || subPage === 'cards' "
      class="double"
    />
    <MarkdownAndSubthemes
      v-if="!subPage"
      class="double"
    />
    <ButtonsAndActions v-if="!subPage || subPage === 'buttonsandactions'" />
    <NavigationComponents
      v-if="!subPage"
      class="double"
    />
    <SnackbarTester v-if="!subPage || subPage === 'notifications' " />
  </cyan-layout>
</template>