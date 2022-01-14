<script setup lang="ts">
import { getAnalytics, logEvent } from 'firebase/analytics'
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import Button from '../ui/Button.vue'
const router = useRouter()

const t = useI18n().t

function socialGoogleLogin() {
  const provider = new GoogleAuthProvider()
  provider.addScope('email')
  signInWithPopup(getAuth(), provider).then(() => {
    logEvent(getAnalytics(), 'Login', { vendor: 'Google' })
    router.push('/')
  })
}
</script>

<template>
  <Button @click.prevent="socialGoogleLogin">
    {{ t('AccountView.Login') }}
  </Button>
</template>

