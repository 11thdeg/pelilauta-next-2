<script lang="ts" setup>
import { Site } from "@11thdeg/skaldstore"
import { ref } from "@vue/reactivity"
import { onMounted } from "@vue/runtime-core"
import { useSites } from "../../composables/useSites"
import Loader from '../ui/Loader.vue'
import SiteAvatar from "./SiteAvatar.vue"

const props = defineProps<{
  siteid: string
}>()

const { fetchSite } = useSites()
const site = ref<Site|undefined>()

onMounted(async () => {
  site.value = await fetchSite(props.siteid)
})

</script>

<template>
  <div id="SiteTray">
    <Loader v-if="!site" />
    <template v-if="site">
      <h3>
        <SiteAvatar
          :siteid="siteid" 
          style="display:inline-block"
        />

  
        {{ site.name }}
      </h3>
      <h4
        v-for="category in site.pageCategories"
        :key="category.slug"
      >
        {{ category.name }}
      </h4>
    </template>
  </div>
</template>
