<script lang="ts" setup>
import { computed, onMounted, watch } from 'vue';
import TopAppBar from '../../components/navigation/TopAppBar.vue'
import { useSites } from '../../composables/useSites';
import { useAuthz } from '../../stores/authz';

const { subscribeToUserSites, userSites } = useSites()

const authz = useAuthz()
onMounted(() => {
  watch(authz.user, (user) => {
    subscribeToUserSites(user.uid)
  }, { immediate: true })
})

const sites = computed(() => {
  return userSites.value
})
</script>

<template>
  <TopAppBar />
  <main class="singleColumnLayout">
    {{ sites }}
  </main>
</template>