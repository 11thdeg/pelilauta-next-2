<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import Button from '../ui/Button.vue'
const { t } = useI18n()
</script>

<template>
  <Button
    text
    icon="share"
  >
    {{ t('actions.share') }}
  </Button>
</template>