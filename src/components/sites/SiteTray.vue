<script lang="ts" setup>
import { Site } from "@11thdeg/skaldstore"
import { ref } from "@vue/reactivity"
import { onMounted } from "@vue/runtime-core"
import { usePages } from "../../composables/usePages"
import { useSites } from "../../composables/useSites"
import Loader from '../ui/Loader.vue'
import SiteAvatar from "./SiteAvatar.vue"

const props = defineProps<{
  siteid: string
}>()

const { fetchSite } = useSites()
const { pages, subscribeToSite } = usePages()
const site = ref<Site|undefined>()

onMounted(async () => {
  site.value = await fetchSite(props.siteid)
  subscribeToSite(props.siteid)
})

function inCategory (category: string) {
  const arr = Array.from(pages.value.values())
  return arr.filter(page => page.category === category) || []
}

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
        <p
          v-for="page in inCategory(category.slug)"
          :key="page.key"
        >
          <router-link :to="`/sites/${siteid}/pages/${page.key}`">
            {{ page.name }}
          </router-link>
        </p>
      </h4>
    </template>
  </div>
</template>