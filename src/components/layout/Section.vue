<script lang="ts" setup>
</script>

<template>
  <section class="Section">
    <slot />
  </section>
</template>

<style lang="sass" scoped>
section.Section + section.Section
  margin-top: var(--page-grid-gap)
</style>