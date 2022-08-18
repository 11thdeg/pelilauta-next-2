<script lang="ts" setup>
import { Site } from '@11thdeg/skaldstore'
import Card from '../ui/Card.vue'

const props = defineProps<{
  site: Site
}>()
</script>

<template>
  <Card>
    <section class="icon">
      <cyan-icon
        :noun="props.site.systemBadge"
        large
      />
    </section>
    <section class="info">
      <h1>{{ site.name }}</h1>
    </section>
  </Card>
</template>