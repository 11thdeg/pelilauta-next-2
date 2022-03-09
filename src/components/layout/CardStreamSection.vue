<script lang="ts" setup>
import Section from './Section.vue'

</script>

<template>
  <Section class="CardStreamSection">
    <slot />
  </Section>
</template>

<style scoped>
.CardStreamSection {
  display: flex;
  flex-direction: column;
  gap: var(--page-grid-gap);
}
</style>