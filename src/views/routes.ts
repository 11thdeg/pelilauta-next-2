import Home from './Index.vue'
import About from './About.vue'

export const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/admin',  component: () => import('./admin/AdminIndexView.vue') },
  { path: '/admin/entryfixer',  component: () => import('./admin/EntryFixerView.vue') },
  { path: '/sites/', component: () => import('./sites/SiteIndexView.vue'),
    children: [
      { path: 'owns', component: () => import('./sites/siteindex/OwnedSubview.vue') },
      { path: 'plays', component: () => import('./sites/siteindex/PlaysInSubview.vue') },
      { path: 'all', component: () => import('./sites/siteindex/AllSitesSubview.vue') },
    ]
  },
  { path: '/site/:siteid', component: () => import('./sites/SiteHomeView.vue'), props: true },
  { path: '/site/:siteid/add/page', component: () => import('./sites/PageEditView.vue'), props: true },
  { path: '/site/:siteid/page/:pageid', component: () => import('./sites/PageView.vue'), props: true },
  { path: '/site/:siteid/page/:pageid/edit', component: () => import('./sites/PageEditView.vue'), props: true },
  { path: '/stylebook', component: () => import('./Stylebook.vue') },
  { path: '/stylebook/:page', component: () => import('./Stylebook.vue'), props: true },
  { path: '/login', component: () => import('./LoginView.vue') },
  { path: '/account', component: () => import('./AccountView.vue') },
  { path: '/account/delete', component: () => import('./AccountDeleteView.vue') },
  { path: '/assets', component: () => import('./AssetsView.vue') },
  { path: '/create/thread', component: () => import('./forum/CreateThreadView.vue'), props: true },
  { path: '/threads/:threadid', component: () => import('./forum/ThreadView.vue'), props: true},
  { path: '/bio/:uid', component: () => import('./BioView.vue'), props: true }
]