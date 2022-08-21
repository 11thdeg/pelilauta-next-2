import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createI18n } from 'vue-i18n'
import { createPinia } from 'pinia'
import { routes } from './views/routes'
import App from './App.vue'
import { firebaseConfig } from './firebaseConfig'
import { initializeApp } from "firebase/app"
import { getAnalytics, logEvent } from "firebase/analytics"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import 'animate.css'
import { useAuthz } from './stores/authz'
import fi from './locales/fi.json'
import en from './locales/en.json'
import '@11thdeg/cyan'
import { logDebug } from './utils/loghelpers'

const router = createRouter({
  history: createWebHistory(),
  routes: routes
})

const pinia = createPinia()

const i18n = createI18n({
  legacy: false,
  locale: 'fi',
  fallbackLocale: 'fi',
  messages: {
    en: en,
    fi: fi
  }
})

const app = createApp(App)
app.use(router)
app.use(pinia)
app.use(i18n)

const fb = initializeApp(firebaseConfig)
const analytics = getAnalytics(fb)
const auth = getAuth(fb)

const authz = useAuthz()

onAuthStateChanged(auth, (user) => {
  authz.loginAs(user)
})

logEvent(analytics, "app_start")
app.mount('#app')

logDebug('Adding the Cyan theming to app by force')
document.body.classList.add('cyan--themed')
document.body.classList.add('cyan--mode--dark')