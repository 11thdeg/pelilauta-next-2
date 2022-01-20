import Home from './Index.vue'
import About from './About.vue'

export const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/stylebook', component: () => import('./Stylebook.vue') },
  { path: '/login', component: () => import('./LoginView.vue') },
  { path: '/account', component: () => import('./AccountView.vue') },
  { path: '/account/delete', component: () => import('./AccountDeleteView.vue') },
  { path: '/assets', component: () => import('./AssetsView.vue') },
]