<script setup lang="ts">
import { getAnalytics, logEvent } from 'firebase/analytics'
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { useRouter } from 'vue-router'
import Button from '../ui/Button.vue'

const router = useRouter()

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
    Login
  </Button>
</template>

