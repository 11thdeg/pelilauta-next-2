<template>
  <div class="LoginView">
    <TopAppBar
      title="Login"
      show-back-button
    />
    <main class="singleColumnLayout">
      <LoginPanel />
    </main>
  </div>
</template>

<script lang="ts" setup>
import TopAppBar from '../components/navigation/TopAppBar.vue';
import LoginPanel from '../components/account/login/LoginPanel.vue';

</script>