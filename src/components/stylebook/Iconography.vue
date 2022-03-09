<script lang="ts" setup>
import Column from '../ui/Column.vue'
import { iconlist } from '../ui/iconlist'
import Icon from '../ui/Icon.vue'
import ToggleButton from '../ui/ToggleButton.vue'
import { ref } from 'vue'

const onSurface = ref(false)
const invertIconColor = ref(false)
</script>

<template>
  <Column id="Iconography">
    <section>
      <h1>Iconography</h1>
      <p>The icons are available onDark/dark and onBright/light variations.</p>
      <p style="vertical-align:middle;">
        <ToggleButton v-model="onSurface" /> On a <span class="code">.surface</span>.
      </p>
      <p>
        <ToggleButton v-model="invertIconColor" /> Invert icon color.
      </p>
      <div class="iconlist" :class="{ surface: onSurface }">
        <div
          v-for="icon in iconlist"
          :key="icon"
          class="preview TypeCaption"
        >
          <Icon
            :icon="icon"
            :invert="invertIconColor"
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
  margin: 0px
  padding: 8px
  border: solid 1px var(--chroma-secondary-d)
  border-radius: 12px
  align-items: center
  align-content: center
  flex-direction: row
  justify-content: center
  transition: all 0.2s ease-in-out
  .preview
    text-align: center
    width: 56px
</style>
