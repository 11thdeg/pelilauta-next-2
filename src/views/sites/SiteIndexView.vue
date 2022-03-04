<script lang="ts" setup>
import TopAppBar from '../../components/navigation/TopAppBar.vue'
import TabTray from '../../components/navigation/TabTray.vue'
import TabButton from '../../components/navigation/TabButton.vue'
import { useI18n } from 'vue-i18n'
import Main from '../../components/layout/Main.vue'
import Column from '../../components/ui/Column.vue'
import CreateSiteCta from '../../components/calltoaction/CreateSiteCta.vue'

const { t } = useI18n()
</script>

<template>
  <TopAppBar />
  <Main book-layout>
    <Column double>
      <TabTray>
        <TabButton
          :label="t('sites.owns.title')"
          icon="d12"
          :active="$route.path.startsWith('/sites/owns') || $route.path === ('/sites')"
          @click="$router.push('/sites/owns')"
        />
        <TabButton
          :label="t('sites.plays.title')"
          icon="adventurer"
          :active="$route.path.startsWith('/sites/plays')"
          @click="$router.push('/sites/plays')"
        />
        <TabButton
          :label="t('sites.all.title')"
          icon="mekanismi"
          :active="$route.path.startsWith('/sites/all')"
          @click="$router.push('/sites/all')"
        />
      </TabTray>
      <router-view />
    </Column>
    <Column>
      <CreateSiteCta />
    </Column>
  </Main>
</template>