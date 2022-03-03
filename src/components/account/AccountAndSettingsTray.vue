<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import NavigationTray from '../navigation/NavigationTray.vue'

const { t } = useI18n()

</script>
<template>
  <NavigationTray>
    <h3>{{ t('account.tray.title') }}</h3>
    <h3>{{ t('admin.tray.title') }}</h3>
  </NavigationTray>
</template>