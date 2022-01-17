<script lang="ts" setup>
import { computed } from 'vue';
import { useAuthz } from '../../stores/authz';
import Loader from '../ui/Loader.vue'
import LoginPanel from '../account/login/LoginPanel.vue';
import Button from '../ui/Button.vue';
import { useI18n } from 'vue-i18n';

const authz = useAuthz()
const t = useI18n().t

const initialized = computed(() => authz.initialized)

const loginAsAnonymous = () => {
  authz.loginAsAnonymous()
}

</script>

<template>
  <div id="LoadingScreen">
    <div
      id="SiteLogoContainer"
      class="chroma-box-3"
    >
      <img
        id="logo"
        alt="Charna logo"
        src="/proprietary/fox.svg"
      >
    </div>
    <div
      v-if="!initialized"
      id="Loading"
    >
      <Loader />
    </div>
    <div
      v-else
      id="loginActions"
    >
      <LoginPanel />
      <hr>
      <Button
        text
        @click.prevent="loginAsAnonymous"
      >
        {{ t('login.continueAsAnonymous') }}
      </Button>
    </div>
  </div>
</template>

<style lang="sass">
div#LoadingScreen
  position: fixed
  top: 0
  left: 0
  width: 100vw
  height: 100vw
  box-sizing: border-box
  background-color: var(--chroma-primary-a)
  background: linear-gradient(11deg, var(--chroma-secondary-a) 0%, var(--chroma-secondary-b) 100%)  
  div#SiteLogoContainer
    height: min(256px, 80vw)
    width: min(256px, 80vw)
    border-radius: 50%
    overflow: visible
    margin: 0 auto
    margin-top: 64px
  div#Loading
    margin: 72px auto
    width: 128px
  div#loginActions
    width: min(256px, 80vw)
    margin: 56px auto
    padding: 0
    display: flex
    flex-direction: column
  img#logo
    width: 110%
    margin-left: -5%
    -webkit-filter: drop-shadow( 0px 0px 16px rgba(#002337, .5))
    filter: drop-shadow( 0px 0px 16px rgba(#002337, .5))
</style>
