<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import { useSites } from '../../../composables/useSites'
import { useAuthz } from '../../../stores/authz'
import Card from '../../../components/ui/Card.vue'
import CardStreamSection from '../../../components/layout/CardStreamSection.vue'
import SiteListFilter from '../../../components/sites/SiteListFilter.vue'

const { userSites, subscribeToUserSites } = useSites()
const authz = useAuthz()
const orderBy=ref('name_asc')

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
      <Card
        v-for="site in sites"
        :key="site.key"
      >
        <h2>
          <router-link :to="`/site/${site.key}`">
            {{ site.name }}
          </router-link>
        </h2>
        <p>{{ site.description }}</p>
      </Card>
    </CardStreamSection>
  </article>
</template>