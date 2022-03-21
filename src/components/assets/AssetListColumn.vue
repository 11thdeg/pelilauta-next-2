<script lang="ts" setup>
import { computed } from 'vue'
import { useAssets } from '../../stores/assets'
import Column from '../ui/Column.vue'
import AssetListItem from './AssetListItem.vue'

const assetStore = useAssets()

const assetList = computed(() => assetStore.assets)

</script>
<template>
  <Column class="AssetListColumn">
    <section class="assetListSection">
      <AssetListItem
        v-for="asset in assetList"
        :key="asset[0]"
        :asset-id="asset[0]"
      />
    </section>
    <div
      v-for="asset in assetList"
      :key="asset[0]"
    >
      <span class="code">{{ asset[0] }}</span>
    </div>
  </Column>
</template>

<style lang="sass" scoped>
.assetListSection
  display: flex
  flex-direction: column
  gap: 12px
  margin-bottom: 12px
</style>