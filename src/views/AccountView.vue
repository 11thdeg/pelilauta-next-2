<script lang="ts" setup>
import TopAppBar from '../components/navigation/TopAppBar.vue'
import AccountSettingsPane from '../components/account/AccountSettingsPane.vue'
import AccountActionsColumn from '../components/account/AccountActionsColumn.vue'
import ProfileSettingsColumn from '../components/account/ProfileSettingsColumn.vue'
import { useI18n } from 'vue-i18n';
import AccountAndSettingsTray from '../components/account/AccountAndSettingsTray.vue';

const { t } = useI18n()

</script>

<template>
  <div class="LoginView">
    <TopAppBar
      icon="avatar"
      :title="t('account.title')"
    />
    <AccountAndSettingsTray />
    <main class="dashBoardLayout">
      <AccountActionsColumn />
      <ProfileSettingsColumn />
      <AccountSettingsPane />
    </main>
  </div>
</template>

