<script lang="ts" setup>
import TopAppBar from '../components/navigation/TopAppBar.vue'
import { useI18n } from 'vue-i18n'
import Main from '../components/layout/Main.vue';
import { useNotifications } from '../composables/useNotifications';
import Card from '../components/ui/Card.vue';
import AuthorTag from '../components/author/AuthorTag.vue';

const { t } = useI18n()
const { notifications } = useNotifications()
</script>

<template>
  <div class="NotificationsView">
    <TopAppBar
      :title="t('Notifications.title')"
      icon="send"
      sticky
    />
    <Main>
      <Card v-for="n in notifications" :key="n.key">
        <AuthorTag :uid="n.from" />
        <p>{{ n.message }}</p>
        </Card>
    </Main>
  </div>
</template>