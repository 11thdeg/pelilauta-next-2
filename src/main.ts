import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createPinia } from 'pinia'
import { routes } from './views/routes'
import App from './App.vue'
import { firebaseConfig } from './firebaseConfig'
import { initializeApp } from "firebase/app"
import { getAnalytics, logEvent } from "firebase/analytics"
import { useStore } from './stores/main'
import { getAuth, onAuthStateChanged } from "firebase/auth"
import 'animate.css'
import { useSession } from './stores/session'

const router = createRouter({
  history: createWebHistory(),
  routes: routes
})

const pinia = createPinia()

const app = createApp(App)
app.use(router)
app.use(pinia)
const state = useStore() // needs to be called after app.use(pinia)

const fb = initializeApp(firebaseConfig)
const analytics = getAnalytics(fb)
const auth = getAuth(fb)

const session = useSession()
session.firebaseInitialized()

onAuthStateChanged(auth, (user) => {
  console.log('User logged in:', user)
  state.initialize(user)
  session.loginAs(user)
})

logEvent(analytics, "app_start")
app.mount('#app')
