<template>
  <div class="LoginView">
    <TopAppBar
      title="Account"
    />
    <main class="singleColumnLayout">
      <LogoutButton />
    </main>
  </div>
</template>

<script lang="ts" setup>
import TopAppBar from '../components/navigation/TopAppBar.vue';
import LogoutButton from '../components/account/LogoutButton.vue';

</script>