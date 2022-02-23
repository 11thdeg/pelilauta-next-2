<script lang="ts" setup>
import { computed, watch } from 'vue'
import { useSites } from '../../../composables/useSites'
import { useAuthz } from '../../../stores/authz'
import Card from '../../../components/ui/Card.vue'

const { userSites, subscribeToUserSites } = useSites()
const authz = useAuthz()

watch(() => authz.user, (user) => {
  subscribeToUserSites(user.uid)
}, { immediate: true })

const sites = computed(() => {
  return userSites.value
})

</script>
<template>
  <h1>Owned!</h1>
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
</template>