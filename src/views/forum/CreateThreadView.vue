<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import TopAppBar from '../../components/navigation/TopAppBar.vue'

const t = useI18n().t

</script>

<template>
  <TopAppBar
    :title="t('createThread.title')"
    show-back-button
  />
  <main class="singleColumnLayout">
    ...
  </main>
</template>