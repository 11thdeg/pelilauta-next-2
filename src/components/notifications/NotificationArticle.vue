<script lang="ts" setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import ActionBar from '../ui/ActionBar.vue'
import AuthorTag from '../author/AuthorTag.vue'
import { useNotifications } from '../../composables/useNotifications'
import Button from '../ui/Button.vue'
import SpacerDiv from '../ui/SpacerDiv.vue'

const props = defineProps<{
  label: string
  targetLabel?: string
  to?: string
  message?: string
  from: string,
  notificationKey: string,
  read?: boolean
}>()

const link = computed(() => (props.to || '/profile/' + props.from))

const { t } = useI18n()

const { stampSeen } = useNotifications()

</script>

<template>
  <article class="NotificationArticle" :class="{ 'rise-1': !read }">
    <ActionBar>
      <h3>
        <router-link :to="link">
          {{ t('notifications.label.' + label) }}
          {{ targetLabel }}
        </router-link>
      </h3>
      <SpacerDiv />
      <Button
        icon="delete"
        text
        @click="stampSeen(notificationKey)"
      />
    </ActionBar>
  
    <p class="TypeCaption">
      {{ message }}
    </p>

    <ActionBar>
      <AuthorTag :uid="from" />
    </ActionBar>
  </article>
</template>

<style lang="sass" scoped>
.NotificationArticle
  border-radius: 4px
  padding: 12px 16px
</style>