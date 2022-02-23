<script lang="ts" setup>
import { watch } from 'vue'
import { useSites } from '../../../composables/useSites'
import { useAuthz } from '../../../stores/authz'
import Card from '../../../components/ui/Card.vue'

const { playerSites, subscribeToPlayerSites } = useSites()
const authz = useAuthz()

watch(() => authz.user, (user) => {
  subscribeToPlayerSites(user.uid)
}, { immediate: true })

</script>
<template>
  <h1>Plays!</h1>
  <Card
    v-for="site in playerSites"
    :key="site.key"
  >
    <h2>{{ site.name }}</h2>
    <p>{{ site.description }}</p>
  </Card>
</template>