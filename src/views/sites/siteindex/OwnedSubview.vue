<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import { useSites } from '../../../composables/useSites'
import { useAuthz } from '../../../stores/authz'
import CardStreamSection from '../../../components/layout/CardStreamSection.vue'
import SiteListFilter from '../../../components/sites/SiteListFilter.vue'
import SiteListItem from '../../../components/sites/SiteListItem.vue'

const { userSites, subscribeToUserSites } = useSites()
const authz = useAuthz()
const orderBy=ref('date_desc')

watch(() => authz.user, (user) => {
  subscribeToUserSites(user.uid)
}, { immediate: true })

const sites = computed(() => {
  const arr = userSites.value
  if (orderBy.value === 'name_asc') {
    return arr.sort((a, b) => a.name > b.name ? 1 : -1)
  }
  return arr.sort((a, b) => a.compareFlowTime(b))
})


</script>
<template>
  <article class="OwnedSubView">
    <SiteListFilter
      @order_date_desc="orderBy = 'date_desc'"
      @order_name_asc="orderBy ='name_asc'"
    />
    <CardStreamSection>
      <SiteListItem
        v-for="site in sites"
        :key="site.key"
        :site="site"
      />
    </CardStreamSection>
  </article>
</template>