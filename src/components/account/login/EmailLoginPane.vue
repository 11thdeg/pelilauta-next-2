<template>
  <section id="emailLoginForm">
    <div
      v-if="verify"
      class="verifyWarning"
    >
      {{ t('login.verifyEmailLoginMessage') }}
    </div>

    <template
      v-if="!verify"
    >
      <div>
        <h3>
          {{ t('login.loginWithEmail') }}
        </h3>
      </div>
      <Textfield
        v-model="emailAdress"
        :label="t('login.emailLoginHelper')"
        dark
      />
      <Button
        :disabled="!emailAdress"
        @click="sendLinkToEmail"
      >
        {{ t('login.withEmail') }}
      </Button>
    </template>
  </section>
</template>

<script lang="ts" setup>
import Textfield from '../../ui/Textfield.vue'
import { getAuth, isSignInWithEmailLink, sendSignInLinkToEmail, signInWithEmailLink } from '@firebase/auth'
import { ref } from 'vue'
import { useSnack } from '../../../composables/useSnack'
import { logError } from '../../../utils/loghelpers'
import { useI18n } from 'vue-i18n'
import Button from '../../ui/Button.vue'

const emailAdress = ref('')
const verify = ref(isSignInWithEmailLink(getAuth(), window.location.href))
const { pushSnack } = useSnack()
const t = useI18n().t

function singInWithEmail () {
  if (!emailAdress.value) {
    pushSnack('snacks.invalidEmail')
    return
  }
  signInWithEmailLink(getAuth(), emailAdress.value, window.location.href)
    .then(() => {
      // Clear email from storage.
      window.localStorage.removeItem('emailForSignIn')
    })
    .catch((error: Error) => {
      pushSnack('snacks.error', { params: { topic: error.message }})
      logError(error)
    })
}

if (verify.value) {
  emailAdress.value = window.localStorage.getItem('emailForSignIn') || ''
  if (emailAdress.value) {
    singInWithEmail()
  }
}

const actionCodeSettings = {
  // URL we want to redirect back to. The domain (www.example.com) for this
  // URL must be in the authorized domains list in the Firebase Console.
  url: `https://${window.location.hostname}/login?verify=true`,
  // This must be true.
  handleCodeInApp: true
}
const sendLinkToEmail = async () => {
  if (verify.value) singInWithEmail()

  return sendSignInLinkToEmail(getAuth(), emailAdress.value, actionCodeSettings)
    .then(() => {
      // The link was successfully sent. Inform the user.
      // Save the email locally so you don't need to ask the user for it again
      // if they open the link on the same device.
      window.localStorage.setItem('emailForSignIn', emailAdress.value)
      pushSnack('snacks.emailSent')
    })
    .catch((error: Error) => {
      pushSnack('snacks.error', { params: { topic: error.message }})
      logError(error)
  })
}

</script>

<style lang="sass" scoped>
#emailLoginForm
  display: flex
  flex-direction: column
  align-items: stretch
  gap: 8px
</style>