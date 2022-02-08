<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import TopAppBar from '../../components/navigation/TopAppBar.vue'
import CreateThreadForm from '../../components/threads/CUThreadForm.vue'
import { ref } from 'vue'

const t = useI18n().t

const withImages = ref(false)
const withYoutube = ref(false)

</script>

<template>
  <TopAppBar
    :title="t('createThread.title')"
    show-back-button
  />
  <main class="singleColumnLayout">
    <CreateThreadForm
      :with-youtube="withYoutube"
      :with-images="withImages"
    />
  </main>
</template>