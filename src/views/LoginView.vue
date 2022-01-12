<template>
  <div class="LoginView">
    <TopAppBar
      title="Login"
      showBackButton
    />
    <main class="singleColumnLayout">
      <LoginPanel />
    </main>
  </div>
</template>

<script lang="ts" setup>
import TopAppBar from '../components/navigation/TopAppBar.vue';
import LoginPanel from '../components/account/LoginPanel.vue';

</script>