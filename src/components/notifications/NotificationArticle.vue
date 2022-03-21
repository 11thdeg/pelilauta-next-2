<script lang="ts" setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import ActionBar from '../ui/ActionBar.vue'
import AuthorTag from '../author/AuthorTag.vue'

const props = defineProps<{
  label: string
  targetLabel?: string
  to?: string
  message?: string
  from: string
}>()

const link = computed(() => (props.to || '/profile/' + props.from))

const { t } = useI18n()

</script>

<template>
  <article class="NotificationArticle rise-1">
    <h3>
      <router-link :to="link">
        {{ t('notifications.label.' + label) }}
        {{ targetLabel }}
      </router-link>
    </h3>
  
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