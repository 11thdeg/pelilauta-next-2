<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps<{
  bookLayout?: boolean
  dashboardLayout?: boolean
  emptyLayout?: boolean
}>()

const layoutClasses = computed(() => ({
  singleColumnLayout: !props.bookLayout && !props.dashboardLayout && !props.emptyLayout,
  bookLayout: props.bookLayout,
  dashboardLayout: props.dashboardLayout,
  emptyLayout: props.emptyLayout
}))
</script>

<template>
  <main :class="layoutClasses">
    <slot />
  </main>
</template>

<style lang="sass">
@import ../../styles/include-media.scss

@mixin LayoutBase()
  display: flex
  flex-direction: column
  gap: var(--page-grid-gap) var(--page-column-gap)
  margin: 0 auto
  padding: 12px 8px
  box-sizing: border-box
  section
    margin: 0
  @include media('>=600px')
    padding: 12px 16px

// *** singleColumnLayout ************************************************
.singleColumnLayout
  @include LayoutBase()

@include media('>=600px')
  .singleColumnLayout
    width: 720px
    margin: 0 auto

// *** dashBoardLayout ************************************************
.dashBoardLayout
  @include LayoutBase()

@include media('>=600px')
  .dashBoardLayout
    flex-direction: row
    flex-wrap: wrap
  .dashBoardLayout > article.Column
    width: calc(100% / 2 - 60px)
    flex-grow: 0
    flex-shrink: 0

@include media('>=1400px')
  .dashBoardLayout > article.Column
    width: calc(100% / 3 - 16px)

// *** emptyLayout ****************************************************
.emptyLayout
  @include LayoutBase()

@include media('>=600px')
  .emptyLayout
    display: flex
    flex-wrap: wrap
    box-sizing: border-box
    div.column
      width: 100%

// *** bookLayout *****************************************************
.bookLayout
  @include LayoutBase()

@include media('>=600px')
  .bookLayout
    flex-direction: row
    flex-wrap: wrap
    justify-content: center
    align-items: flex-start
    .Column
      width: 360px
      flex-shrink: 0
      flex-grow: 0
    .double
      width: 720px
      flex-shrink: 0
    .double-cut
      width: 445px
      flex-shrink: 0
</style>