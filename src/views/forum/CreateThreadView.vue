<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import TopAppBar from '../../components/navigation/TopAppBar.vue'
import CreateThreadForm from '../../components/threads/CreateThreadForm.vue'

const t = useI18n().t

</script>

<template>
  <TopAppBar
    :title="t('createThread.title')"
    show-back-button
  />
  <main class="singleColumnLayout">
    <CreateThreadForm />
  </main>
</template>