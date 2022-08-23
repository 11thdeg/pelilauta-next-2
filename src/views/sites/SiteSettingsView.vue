<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { Site } from "@11thdeg/skaldstore"
import { useSites } from '../../composables/useSites'
import TopAppBar from '../../components/navigation/TopAppBar.vue'
import { useI18n } from 'vue-i18n'
import Main from '../../components/layout/Main.vue'
import NavigationTray from '../../components/navigation/NavigationTray.vue'
import SiteTray from '../../components/sites/SiteTray.vue'
import SiteMetaColumn from '../../components/sites/SiteMetaColumn.vue'
import SiteInfoColumn from '../../components/sites/SiteInfoColumn.vue'

const props = defineProps<{
  siteid: string
}>()

const { fetchSite } = useSites()
const { t } = useI18n()

const site = ref(new Site())
const loading = ref(true)

onMounted(async () => {
  site.value = await fetchSite(props.siteid) || new Site()
  loading.value = false
})
</script>

<template>
  <TopAppBar
    :title="t('site.settings.title')"
    show-back-button
  />
  <NavigationTray>
    <SiteTray :siteid="siteid" />
  </NavigationTray>
  <Main book-layout>
    <SiteInfoColumn :siteid="siteid" />
    <SiteMetaColumn :siteid="siteid" />
  </Main>
</template>