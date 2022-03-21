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
import { computed } from "vue"
import Section from "../layout/Section.vue"
import TrayHeader from "../navigation/tray/TrayHeader.vue"
import { logDebug } from "../../utils/loghelpers"

const props = defineProps<{
  siteid: string
}>()

const { t } = useI18n()
const { fetchSite, updateSite } = useSites()
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

const withoutCategory = computed(() => {
  return Array.from(pages.value.values())
    .filter(page => !page.category)
})

function moveUp (slug: string) {
  logDebug('moveDown', slug)
  if (site.value) {
    const index = site.value.pageCategories.findIndex(cat => cat.slug === slug)
    if (index > site.value.pageCategories.length - 2) {
      return
    }
    const cat = site.value.pageCategories[index]
    site.value.pageCategories.splice(index, 1)
    site.value.pageCategories.splice(index + 1, 0, cat)
    updateSite(site.value)
  }
}

function moveDown (slug: string) {
  logDebug('moveUp', slug)
  if (site.value) {
    const index = site.value.pageCategories.findIndex(cat => cat.slug === slug)
    if (index < 1) {
      return
    }
    const cat = site.value.pageCategories[index]
    site.value.pageCategories.splice(index, 1)
    site.value.pageCategories.splice(index - 1, 0, cat)
    updateSite(site.value)
  }
}

</script>

<template>
  <div id="SiteTray">
    <Loader v-if="!site" />
    <template v-if="site">
      <div class="trayHeader">
        <SiteAvatar
          :siteid="siteid" 
          style="display:inline-block"
        />
        <h3 style="margin:0">
          <router-link :to="`/site/${site.key}`">
            {{ site.name }}
          </router-link>
        </h3>
      </div>
      
      <Fab
        small
        icon="add"
        :label="t('actions.add')"
        @click.prevent="$router.push(`/site/${siteid}/add/page`)"
      />
      <Section>
        <template
          v-for="category in site.pageCategories"
          :key="category.slug"
        >
          <TrayHeader
            :label="category.name"
            tools
            @move-down="moveUp(category.slug)"
            @move-up="moveDown(category.slug)"
          />
          <p
            v-for="page in inCategory(category.slug)"
            :key="page.key"
          >
            <router-link :to="`/site/${siteid}/page/${page.key}`">
              {{ page.name }}
            </router-link>
          </p>
        </template>
      </Section>
      <Section v-if="withoutCategory && withoutCategory.length">
        <h4>
          {{ t('site.pages.withoutCategory') }}
        </h4>
        <p
          v-for="page in withoutCategory"
          :key="page.key"
        >
          <router-link :to="`/site/${siteid}/page/${page.key}`">
            {{ page.name }}
          </router-link>
        </p>
      </Section>
    </template>
  </div>
</template>

<style scoped>
.trayHeader {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  margin-bottom: var(--page-grid-gap);
  gap: var(--page-column-gap);
}
</style>
