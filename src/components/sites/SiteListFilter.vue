<script lang="ts" setup>
import Button from '../ui/Button.vue'
import ActionBar from '../ui/ActionBar.vue'

const emit = defineEmits<{
  (e: 'order_date_desc'): void
  (e: 'order_name_asc'): void
}>()
</script>

<template>
  <ActionBar class="SiteListFilter">
    <h4>ORDER_BY</h4>
    <Button
      text
      icon="eye"
      @click="emit('order_date_desc')"
    >
      BY_DATE
    </Button>
    <Button
      text
      icon="eye"
      @click="emit('order_name_asc')"
    >
      BY_NAME
    </Button>
  </ActionBar>
</template>

<style lang="sass" scoped>
</style>