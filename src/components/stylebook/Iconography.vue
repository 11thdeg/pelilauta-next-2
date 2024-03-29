<script lang="ts" setup>
import { iconlist } from '../ui/iconlist'
import ToggleButton from '../ui/ToggleButton.vue'
import { ref } from 'vue'

const onSurface = ref(false)
const invertIconColor = ref(false)
const sizeDemoIcon = ref('fox')
</script>

<template>
  <cyan-column id="Iconography">
    <section>
      <h1>Iconography</h1>
      <p>The icons are available onDark/dark and onBright/light variations.</p>
      <p style="vertical-align:middle;">
        <ToggleButton v-model="onSurface" /> On a <span class="code">.surface</span>.
      </p>
      <p>
        <ToggleButton v-model="invertIconColor" /> Invert icon color.
      </p>
      <div
        class="iconlist"
        :class="{ surface: onSurface }"
      >
        <div
          v-for="icon in iconlist"
          :key="icon"
          class="preview TypeCaption"
        >
          <cyan-icon
            :noun="icon"
            :invert="invertIconColor"
            class="hoverable clickable"
            @click.prevent="sizeDemoIcon = icon"
          /><br>
          {{ icon }}
        </div>
      </div>
      <div>
        <h2>Icon sizes</h2>
        <div class="sizeGrid">
          <cyan-icon
            :noun="sizeDemoIcon"
            xsmall
            class="hoverable clickable"
          />
          <cyan-icon
            :noun="sizeDemoIcon"
            small
            class="hoverable clickable"
          />
          <cyan-icon
            :noun="sizeDemoIcon"
            class="hoverable clickable"
          />
          <cyan-icon
            :noun="sizeDemoIcon"
            large
            class="hoverable clickable"
          />
          <cyan-icon
            :noun="sizeDemoIcon"
            xlarge
            class="hoverable clickable"
          />

          <p><span class="code">xsmall</span></p>
          <p><span class="code">small</span></p>
          <p><i>[medium]</i></p>
          <p><span class="code">large</span></p>
          <p><span class="code">xlarge</span></p>
        </div>
      </div>
    </section>
  </cyan-column>
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
.sizeGrid
  display: grid
  grid-template: 1fr 1fr 1fr 1fr 1fr / 1fr 1fr 1fr 1fr 1fr
  justify-items: center
  align-items: center
</style>
