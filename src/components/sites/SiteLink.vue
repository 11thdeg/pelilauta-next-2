<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useSites } from '../../composables/useSites'

const props = defineProps<{
  siteid: string
}>()

const { fetchSite } = useSites()

const sitename = ref('...')

onMounted(async () => {
  const s = await fetchSite(props.siteid)
  sitename.value = s.name
})


</script>

<template>
  <span class="SiteLink">
    <router-link :to="`/site/${siteid}`">
      {{ sitename }}
    </router-link>
  </span>
</template>