<template>
  <nav class="TabTray">
    <slot />
  </nav>
</template>

<style lang="sass" scoped>
.TabTray
  display: flex
  height: 48px
  background-color: var(--color-rise-1)
  margin-bottom: var(--page-grid-gap)
</style>