<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import TopAppBar from '../../components/navigation/TopAppBar.vue'
import Main from '../../components/layout/Main.vue';

const t = useI18n().t

</script>

<template>
  <TopAppBar
    :title="t('editThread.title')"
    show-back-button
  />
  <Main>
    ...
  </Main>
</template>