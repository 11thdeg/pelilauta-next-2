<script lang="ts" setup>
import EmailLoginPane from './EmailLoginPane.vue'
import SocialGoogleLoginButton from './SocialGoogleLoginButton.vue'
import SocialFacebookLoginButton from './SocialFacebookLoginButton.vue'
import { useI18n } from 'vue-i18n'

const t = useI18n().t
</script>

<template>
  <div id="LoginButtonContainer">
    <div>
      <h2>
        {{ t('login.title') }}
      </h2>
    </div>
    <SocialGoogleLoginButton />
    <SocialFacebookLoginButton />
    <hr>
    <EmailLoginPane />
  </div>
</template>

<style lang="sass" scoped>
#LoginButtonContainer
  display: flex
  flex-direction: column
  align-items: stretch

</style>