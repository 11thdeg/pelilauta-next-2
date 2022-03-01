<script lang="ts" setup>
import TopAppBar from '../../components/navigation/TopAppBar.vue'
import Main from '../../components/layout/Main.vue'
import Column from '../../components/ui/Column.vue'
import { usePages } from '../../composables/usePages';
import { Page } from '@11thdeg/skaldstore';
import { computed } from 'vue';
import NavigationTray from '../../components/navigation/NavigationTray.vue';
import SiteTray from '../../components/sites/SiteTray.vue';
import RichContentSection from '../../components/content/RichContentSection.vue';
import FabTray from '../../components/navigation/FabTray.vue';
import Fab from '../../components/ui/Fab.vue';
import { useI18n } from 'vue-i18n';
import PageFabs from '../../components/sites/PageFabs.vue';

const props = defineProps<{
  siteid: string
  pageid: string
}>()

const { t } = useI18n()

const pages = usePages(props.siteid)
const page = computed(() => pages.pages.value.get(props.pageid) || new Page())
</script>

<template>
  <div id="PageView">
    <TopAppBar
      :title="page.name"
      sticky
    />
    <NavigationTray>
      <SiteTray :siteid="siteid" />
    </NavigationTray>
    <Main book-layout>
      <Column
        double
        cut
      >
        <section>
          <h4>{{ page.name }}</h4>
        </section>
        <RichContentSection :content-entry="page" />
      </Column>
    </Main>
    <PageFabs
      :siteid="siteid"
      :pageid="pageid"
    />
  </div>
</template>