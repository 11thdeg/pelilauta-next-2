<script lang="ts" setup>
import { computed } from 'vue'
import { useAssets } from '../../stores/assets'

const props = defineProps<{
  assetId: string
}>()

const assetStore = useAssets()

// const assets = computed(() => assetStore.assets)

const asset = computed(() => assetStore.assets.get(props.assetId))


</script>
<template>
  <div
    v-if="asset"
    class="AssetListItem"
  >
    <img class="preview" :src="asset.url" />
    <div class="TypeCaption filedata">
      {{ asset.name || assetId }} <br>
      {{ asset.description }} <br>
      {{ asset.license }} <br>
      {{ asset.mimetype }}
    </div>
  </div>
</template>

<style lang="sass" scoped>
.AssetListItem
  position: relative
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