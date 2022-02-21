<script lang="ts" setup>
import TopAppBar from '../../components/navigation/TopAppBar.vue'
import Main from '../../components/layout/Main.vue'
import Column from '../../components/ui/Column.vue'
import { usePages } from '../../composables/usePages';
import { Page } from '@11thdeg/skaldstore';
import { computed } from 'vue';
import NavigationTray from '../../components/navigation/NavigationTray.vue';
import SiteTray from '../../components/sites/SiteTray.vue';

const props = defineProps<{
  siteid: string
  pageid: string
}>()

const pages = usePages(props.siteid)
const page = computed(() => pages.pages.value.get(props.pageid) || new Page())
</script>

<template>
  <div id="PageView">
    <TopAppBar :title="page.name" />
    <NavigationTray>
      <SiteTray :siteid="siteid" />
    </NavigationTray>
    <Main book-layout>
      <Column>
        {{ siteid }} / {{ pageid }}
      </Column>
      <Column>
        {{ page.name }}
      </Column>
    </Main>
  </div>
</template>