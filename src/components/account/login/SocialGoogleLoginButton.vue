<script lang="ts" setup>
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { useI18n } from 'vue-i18n'
import { logEvent } from '../../../utils/loghelpers'
import Button from '../../ui/Button.vue'

const t = useI18n().t

function socialGoogleLogin () {
      const provider = new GoogleAuthProvider()
      provider.addScope('email')
      signInWithPopup(getAuth(), provider).then(() => {
        logEvent('Login', { vendor: 'Google' })
      })
    }
</script>

<template>
  <Button
    icon="google"
    @click.prevent="socialGoogleLogin"
  >
    {{ t('login.withGoogle') }}
  </Button>
</template>