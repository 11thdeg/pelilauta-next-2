<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import TopAppBar from '../components/navigation/TopAppBar.vue'

const t = useI18n().t

</script>

<template>
  <div id="AssetsView">
    <TopAppBar
      icon="assets"
      :title="t('assets.title')"
    />
    <main class="singleColumnLayout">
      ...
    </main>
  </div>
</template>