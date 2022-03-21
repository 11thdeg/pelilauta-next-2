<script lang="ts" setup>
import TopAppBar from '../../components/navigation/TopAppBar.vue'
import NavigationTray from '../../components/navigation/NavigationTray.vue'
import SiteTray from '../../components/sites/SiteTray.vue'
import Main from '../../components/layout/Main.vue'
import Column from '../../components/ui/Column.vue'
import { computed, onMounted, ref } from 'vue'
import { useSites } from '../../composables/useSites'
import { Site } from '@11thdeg/skaldstore'
import AuthorTag from '../../components/author/AuthorTag.vue'

const props = defineProps<{
  siteid: string
}>()

const { fetchSite } = useSites()

const site = ref(new Site())
const players = computed(() => site.value.players || [])

onMounted(async () => {
  site.value = await fetchSite(props.siteid)
})

</script>
<template>
  <div id="SiteKeeperView">
    <TopAppBar />
    <NavigationTray>
      <SiteTray :siteid="siteid" />
    </NavigationTray>
    <Main book-layout>
      <Column>
        <p
          v-for="player in players"
          :key="player"
        >
          <AuthorTag :uid="player" />
        </p>
      </Column>
    </Main>
  </div>
</template>