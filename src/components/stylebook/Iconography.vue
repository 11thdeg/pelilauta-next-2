<script lang="ts" setup>
import Column from '../ui/Column.vue'
import { iconlist } from '../ui/iconlist'
import Icon from '../ui/Icon.vue'
</script>

<template>
  <Column id="Iconography">
    <section>
      <h1>Iconography</h1>
      <p>The icons are available onDark/dark and onBright/light variations.</p>
      <div class="iconlist">
        <div
          v-for="icon in iconlist"
          :key="icon"
          class="preview TypeCaption"
        >
          <Icon
            :icon="icon"
          /><br>
          {{ icon }}
        </div>
      </div>
    </section>
  </Column>
</template>

<style lang="sass" scoped>
.iconlist
  display: flex
  flex-wrap: wrap
  gap: 16px
  margin: 8px
  .preview
    text-align: center
    width: 56px
</style>
