import Home from './Index.vue'
import About from './About.vue'

export const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/stylebook', component: () => import('./Stylebook.vue') },
  { path: '/stylebook/:page', component: () => import('./Stylebook.vue'), props: true },
  { path: '/login', component: () => import('./LoginView.vue') },
  { path: '/account', component: () => import('./AccountView.vue') },
  { path: '/account/delete', component: () => import('./AccountDeleteView.vue') },
  { path: '/assets', component: () => import('./AssetsView.vue') },
  { path: '/create/thread', component: () => import('./forum/CreateThreadView.vue'), props: true },
  { path: '/threads/:threadid', component: () => import('./forum/ThreadView.vue'), props: true}
]