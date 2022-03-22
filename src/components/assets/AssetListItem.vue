<script lang="ts" setup>
import { Asset } from '@11thdeg/skaldstore';
import { computed, ref } from 'vue'
import { useAssets } from '../../stores/assets'
import Section from '../layout/Section.vue'

const props = defineProps<{
  assetId: string
}>()

const assetStore = useAssets()

// const assets = computed(() => assetStore.assets)

const asset = computed(() => assetStore.assets.get(props.assetId) || new Asset())
const hoverClass = ref(false)

</script>
<template>
  <Section
    class="AssetListItem hoverable clickable"
    :class="{ 'rise-1': hoverClass }"
    @mouseover="hoverClass = true"
    @mouseleave="hoverClass = false"
    @click="$router.push('/assets/' + asset.key)"
  >
    <img
      class="preview"
      :src="asset.url"
    >
    <div class="TypeCaption filedata">
      {{ asset.name || assetId }} <br>
      {{ asset.description }} <br>
      {{ asset.license }} <br>
      {{ asset.mimetype }}
    </div>
  </Section>
</template>

<style lang="sass" scoped>
.AssetListItem
  position: relative
  border-radius: 6px
.preview
  height: 72px
  width: 72px
  object-fit: cover
  position: absolute
  top: 8px
  left: 8px
  border-radius: 4px
.filedata.TypeCaption
  padding-left: 88px !important
  padding-top: 8px !important
</style>