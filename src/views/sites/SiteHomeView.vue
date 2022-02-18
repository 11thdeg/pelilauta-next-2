<script lang="ts" setup>
import TopAppBar from '../../components/navigation/TopAppBar.vue'
import Main from '../../components/layout/Main.vue'
import NavigationTray from '../../components/navigation/NavigationTray.vue'
import Column from '../../components/ui/Column.vue'
import SiteTray from '../../components/sites/SiteTray.vue';
import { useI18n } from 'vue-i18n';
import { computed, onMounted, ref } from 'vue';
import { useSites } from '../../composables/useSites';
import { Site } from '@11thdeg/skaldstore';

const props = defineProps<{
  siteid: string
}>()

const { t } = useI18n()
const { fetchSite } = useSites()
const site = ref<Site|undefined>()

onMounted(async () => {
  site.value = await fetchSite(props.siteid)
})
const themeClass = computed(() => {
  if (site.value) {
    return 'theme-' + site.value.systemBadge
  }
  return ''
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
      <Column>
        {{ props.siteid }}
      </Column>
    </Main>
  </div>
</template>