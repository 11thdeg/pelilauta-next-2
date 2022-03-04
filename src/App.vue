<script lang="ts" setup>
import LoadingScreen from './components/app/LoadingScreen.vue'
import { computed } from 'vue'
import { useAuthz } from './stores/authz'
import NavigationRail from './components/navigation/NavigationRail.vue'
import Snackbar from './components/app/Snackbar.vue'
import { useStore } from './stores/main'
import NavigationBar from './components/navigation/NavigationBar.vue'
import { Workbox } from 'workbox-window'
import { logDebug } from './utils/loghelpers'
import { useBanner } from './composables/useBanner'
import { useI18n } from 'vue-i18n'
import { useUxState } from './composables/useUxState'
import { getAuth } from 'firebase/auth'
import { useAccount } from './composables/useAccount'

const main = useStore()
main.initAppMeta()
const uxState = useUxState()

const auth = useAuthz()
const showLoadingScreen = computed(() => !auth.operational)
const showTray = computed(() => uxState.navTrayVisible.value)
const { raise } = useBanner()
const t = useI18n().t

const { setAccountData } = useAccount()

const fbAuth = getAuth()
fbAuth.onAuthStateChanged(user => {
  if (user) {
    setAccountData(auth.user.docData)
  } else {
    setAccountData(null)
  }
})

// *** Workbox/Service worker setup starts ******************************
// let skipWaiting: CallableFunction|undefined
if ('serviceWorker' in navigator) {
  const workbox = new Workbox('/service-worker.js')
  const skipWaiting = () => {
    console.debug('App.js skipwaiting called')
    workbox.addEventListener('controlling', (event) => {
      console.debug('controlling', event)
      window.location.reload()
    })
    workbox.messageSkipWaiting()
  }
  workbox.addEventListener('waiting', (event) => {
    console.debug('WorkboxEvent', event.type)
    raise(t('banner.updatesAvailable'), skipWaiting)
  })
  // WB debugs
  workbox.addEventListener('message', (event) => { logDebug('WorkboxEvent', event) })
  workbox.addEventListener('installed', (event) => { logDebug('WorkboxEvent', event) })
  workbox.addEventListener('controlling', (event) => { logDebug('WorkboxEvent', event) })
  workbox.addEventListener('activated', (event) => { logDebug('WorkboxEvent', event) })
  workbox.addEventListener('redundant', (event) => { logDebug('WorkboxEvent', event) })
  workbox.register()
}
// *** Workbox/Service worker setup ends ********************************

</script>

<template>
  <transition
    mode="out-in"
    leave-active-class="animate__animated animate__fadeOut"
    :duration="200"
  >
    <div v-if="showLoadingScreen">
      <LoadingScreen />
    </div>
  </transition>
  <template v-if="!showLoadingScreen">
    <div
      id="AppContent"
      :class="{ showTray: showTray }"
    >
      <router-view />
    </div>
    <NavigationRail />
    <NavigationBar />
  </template>
  <Snackbar />
</template>

<style lang="sass">
@use './styles/color-themes.sass'
@import './styles/app.sass'
@import './styles/include-media.scss'

#AppContent 
  margin-bottom: 80px

@include media('>=600px')
  #AppContent
    box-model: border-box
    margin: 0
    padding: 0
    padding-left: 72px
    &.showTray
      padding-left: calc(80px + 360px)

#app
  background-color: var(--color-background)
  min-height: 100vh
  min-width: 100vw

</style>
