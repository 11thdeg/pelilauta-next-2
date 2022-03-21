<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import TopAppBar from '../components/navigation/TopAppBar.vue'
import AddAssetButton from '../components/actions/AddAssetButton.vue'
import AssetListColumn from '../components/assets/AssetListColumn.vue'
import Main from '../components/layout/Main.vue'
import ActionBar from '../components/ui/ActionBar.vue'
import SpacerDiv from '../components/ui/SpacerDiv.vue'

const { t } = useI18n()

</script>

<template>
  <div id="AssetsView">
    <TopAppBar
      icon="assets"
      :title="t('assets.title')"
    />
    <Main>
      <ActionBar>
        <h3>{{ t('assets.title') }}</h3>
        <SpacerDiv />
        <AddAssetButton />
      </ActionBar>
      <AssetListColumn />
    </Main>
  </div>
</template>