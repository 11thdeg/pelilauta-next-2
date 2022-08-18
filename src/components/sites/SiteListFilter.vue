<script lang="ts" setup>
import Button from '../ui/Button.vue'
import ActionBar from '../ui/ActionBar.vue'
import SpacerDiv from '../ui/SpacerDiv.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const emit = defineEmits<{
  (e: 'order_date_desc'): void
  (e: 'order_name_asc'): void
}>()
</script>

<template>
  <ActionBar class="SiteListFilter">
    <h4>{{ t('actions.orderBy') }}</h4>
    <SpacerDiv />
    <Button
      text
      icon="eye"
      @click="emit('order_date_desc')"
    >
      {{ t('actions.orderByDate') }}
    </Button>
    <Button
      text
      icon="eye"
      @click="emit('order_name_asc')"
    >
      {{ t('actions.orderByTitle') }}
    </Button>
  </ActionBar>
</template>

<style lang="sass" scoped>
</style>