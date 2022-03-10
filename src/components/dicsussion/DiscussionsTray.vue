<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import TrayHeader from '../navigation/tray/TrayHeader.vue'
import { useMeta } from '../../composables/useMeta'
import TrayButton from '../navigation/tray/TrayButton.vue'

const { t } = useI18n()
const { streams } = useMeta()
</script>
<template>
  <section class="DiscussionsTray">
    <TrayHeader
      :label="t('discourse.tray.title')"
      icon="discussion"
      to="/forum"
    />
    <TrayButton
      v-for="stream in streams"
      :key="stream.slug"
      :label="stream.name"
      :to="`/forum/${stream.slug}`"
      :icon="stream.icon"
    />
  </section>
</template>