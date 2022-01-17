<script setup lang="ts">
import { getAnalytics, logEvent } from 'firebase/analytics'
import { getAuth, signOut } from 'firebase/auth'
import { useRouter } from 'vue-router'
import Button from '../ui/Button.vue'
import { useStore } from '../../stores/main'
import { useI18n } from 'vue-i18n'

const router = useRouter()
const store = useStore()

const t = useI18n().t

const logout = async () => {
  store.$reset()
  await signOut(getAuth())
  logEvent(getAnalytics(), 'Logout', { vendor: 'Google' })
  router.push('/')
}

</script>

<template>
  <Button
    text
    @click.prevent="logout"
  >
    {{ t('actions.logout') }}
  </Button>
</template>

