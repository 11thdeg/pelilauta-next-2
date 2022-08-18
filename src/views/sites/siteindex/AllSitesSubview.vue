<script setup lang="ts">
import { Site } from '@11thdeg/skaldstore'
import { collection, DocumentData, getDocs, getFirestore, query, where } from '@firebase/firestore'
import { computed, onMounted, Ref, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import SiteListFilter from '../../../components/sites/SiteListFilter.vue'
import { useSites } from '../../../composables/useSites'
import SiteListItem from '../../../components/sites/SiteListItem.vue'

const { t } = useI18n()
const orderBy=ref('date_desc')


const sites:Ref<Map<string, Site>> = ref(new Map())
const { playerSites, userSites } = useSites()


onMounted(async () => {
  const q = query(collection(getFirestore(), 'sites'), where('hidden', '==', false))
  const docs = await getDocs(q)
  docs.forEach(doc => {
    sites.value.set(doc.id, new Site(doc.data() as DocumentData))
  })
})

const allSites = computed(() => {
  const s = Array.from(sites.value.values())
  s.concat(playerSites.value)
  s.concat(userSites.value)
   if (orderBy.value === 'name_asc') {
    return s.sort((a, b) => a.name > b.name ? 1 : -1)
  }
  return s.sort((a, b) => a.compareFlowTime(b))
})

</script>

<template>
  <h1>{{ t('sites.all.title') }}</h1>
  <SiteListFilter
    @order_date_desc="orderBy = 'date_desc'"
    @order_name_asc="orderBy ='name_asc'"
  />
  <div class="verticalList">
    <SiteListItem
      v-for="site in allSites"
      :key="site.key"
      :site="site"
    />
  </div>
</template>