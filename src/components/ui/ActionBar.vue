<template>
  <section class="ActionBar">
    <slot />
  </section>
</template>

<style lang="sass" scoped>
.ActionBar
  display: flex
  flex-direction: row
  gap: var(--page-grid-gap)
  align-items: center

.ActionBar + .ActionBar
  margin-top: var(--page-grid-gap)
</style>