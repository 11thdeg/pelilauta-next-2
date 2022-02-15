<script lang="ts" setup>
import TopAppBar from '../../components/navigation/TopAppBar.vue'
import NavigationTray from '../../components/navigation/NavigationTray.vue'

</script>

<template>
  <NavigationTray>
    <p>
      <router-link to="/admin/entryfixer">
        EntryFixer
      </router-link>
    </p>
  </NavigationTray>
  <TopAppBar title="ADMIN" />
  <main class="singleColumnLayout">
    ...
  </main>
</template>