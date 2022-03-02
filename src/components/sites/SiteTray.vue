<script lang="ts" setup>
import { Site } from "@11thdeg/skaldstore"
import { ref } from "@vue/reactivity"
import { onMounted } from "@vue/runtime-core"
import { usePages } from "../../composables/usePages"
import { useSites } from "../../composables/useSites"
import Loader from '../ui/Loader.vue'
import SiteAvatar from "./SiteAvatar.vue"
import Fab from "../ui/Fab.vue"
import { useI18n } from "vue-i18n"
import ActionBar from "../ui/ActionBar.vue"

const props = defineProps<{
  siteid: string
}>()

const { t } = useI18n()
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
      <ActionBar style="margin-bottom: 12px">
        <SiteAvatar
          :siteid="siteid" 
          style="display:inline-block"
        />
        <h3 style="margin:0">
          <router-link :to="`/site/${site.key}`">
            {{ site.name }}
          </router-link>
        </h3>
      </ActionBar>
      
      <Fab
        small
        icon="add"
        :label="t('actions.add')"
        @click.prevent="$router.push(`/site/${siteid}/add/page`)"
      />
      <h4
        v-for="category in site.pageCategories"
        :key="category.slug"
      >
        {{ category.name }}
        <p
          v-for="page in inCategory(category.slug)"
          :key="page.key"
        >
          <router-link :to="`/site/${siteid}/page/${page.key}`">
            {{ page.name }}
          </router-link>
        </p>
      </h4>
    </template>
  </div>
</template>
