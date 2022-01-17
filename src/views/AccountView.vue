<template>
  <div class="LoginView">
    <TopAppBar
      icon="avatar"
      title="Account"
    />
    <main class="dashBoardLayout">
      <AccountActionsColumn />
      <AccountSettingsPane />
      <LogoutButton />
    </main>
  </div>
</template>

<script lang="ts" setup>
import TopAppBar from '../components/navigation/TopAppBar.vue'
import LogoutButton from '../components/account/LogoutButton.vue'
import AccountSettingsPane from '../components/account/AccountSettingsPane.vue'
import AccountActionsColumn from '../components/account/AccountActionsColumn.vue'

</script>