<script lang="ts" setup>
import TopAppBar from '../../components/navigation/TopAppBar.vue'
import Main from '../../components/layout/Main.vue'
import NavigationTray from '../../components/navigation/NavigationTray.vue'
import Column from '../../components/ui/Column.vue'
import SiteTray from '../../components/sites/SiteTray.vue';
import { useI18n } from 'vue-i18n';
import { computed, onMounted, ref } from 'vue';
import { useSites } from '../../composables/useSites';
import { Page, Site } from '@11thdeg/skaldstore';
import MarkDownSection from '../../components/ui/MarkDownSection.vue';
import { usePages } from '../../composables/usePages';
import PageFabs from '../../components/sites/PageFabs.vue';

const props = defineProps<{
  siteid: string
}>()

const { t } = useI18n()
const { fetchSite } = useSites()
const site = ref<Site|undefined>()
const { pages } = usePages(props.siteid)

onMounted(async () => {
  site.value = await fetchSite(props.siteid)
})
const themeClass = computed(() => {
  if (site.value) {
    return 'theme-' + site.value.systemBadge
  }
  return ''
})
const homePage = computed(() => {
  if (site.value) {
    const page = pages.value.get(props.siteid)
    if (page) return page
  }
  return new Page()
})

</script>

<template>
  <div
    class="themed"
    :class="themeClass"
  >
    <TopAppBar :title="t('site.home.title')" />
    <Main book-layout>
      <NavigationTray>
        <SiteTray :siteid="siteid" />
      </NavigationTray>
      <Column class="double">
        <MarkDownSection
          v-if="homePage.markdownContent"
          :content="homePage.markdownContent"
        />
        <div
          v-else
          :innerHTML="homePage.htmlContent"
        />
      </Column>
    </Main>
    <PageFabs
      :siteid="siteid"
    />
  </div>
</template>