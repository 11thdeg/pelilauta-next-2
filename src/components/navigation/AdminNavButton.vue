<script lang="ts" setup>
import { useAccount } from '../../composables/useAccount'
import NavButton from './NavButton.vue'

const { showAdminTools } = useAccount()
</script>
<template>
  <NavButton
    v-if="showAdminTools"
    class="AdminNavButton" 
    icon="admin"
    to="/admin"
    label="Admin"
    :active="$route.path.startsWith('/admin')"
  />
</template>