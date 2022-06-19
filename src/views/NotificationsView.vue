<script lang="ts" setup>
import TopAppBar from '../components/navigation/TopAppBar.vue'
import { useI18n } from 'vue-i18n'
import Main from '../components/layout/Main.vue'
import { useNotifications } from '../composables/useNotifications'
import ReplyToThreadNotification from '../components/notifications/ReplyToThreadNotification.vue'

const t = useI18n().t
const notifications = useNotifications().notifications

</script>

<template>
  <div class="NotificationsView">
    <TopAppBar
      :title="t('notifications.title')"
      icon="send"
      sticky
    />
    <Main>
      <ReplyToThreadNotification
        v-for="notification in notifications"
        :key="notification.key"
        :notification="notification"
      />
      <!--Card
        v-for="n in notifications"
        :key="n.key"
      >
        <router-link :to="`/thread/${n.targetKey}`">
          <h4></h4>
        </router-link>
        <AuthorTag :uid="n.from" />
        <p>{{ n.message }}</p>
      </Card-->
    </Main>
  </div>
</template>