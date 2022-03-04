<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<{
  count: number
}>()

const t = useI18n().t
</script>

<template>
  <span class="LoveTag">
    {{ count }} {{ t('info.loves') }}
  </span>
</template>