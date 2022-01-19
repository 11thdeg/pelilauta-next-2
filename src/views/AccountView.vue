<script lang="ts" setup>
import TopAppBar from '../components/navigation/TopAppBar.vue'
import AccountSettingsPane from '../components/account/AccountSettingsPane.vue'
import AccountActionsColumn from '../components/account/AccountActionsColumn.vue'
import ProfileSettingsColumn from '../components/account/ProfileSettingsColumn.vue'

</script>

<template>
  <div class="LoginView">
    <TopAppBar
      icon="avatar"
      title="Account"
    />
    <main class="dashBoardLayout">
      <AccountActionsColumn />
      <ProfileSettingsColumn />
      <AccountSettingsPane />
    </main>
  </div>
</template>

