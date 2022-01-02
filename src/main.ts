import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createPinia } from 'pinia'
import { routes } from './views/routes'
import App from './App.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: routes
})

const pinia = createPinia()

const app = createApp(App)
app.use(router)
app.use(pinia)

app.mount('#app')
