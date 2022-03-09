<script lang="ts" setup>
import TopAppBar from '../../components/navigation/TopAppBar.vue'
import Banner from '../../components/navigation/Banner.vue'
import NavigationTray from '../../components/navigation/NavigationTray.vue'
import { useI18n } from 'vue-i18n'
import DiscussionsTray from '../../components/dicsussion/DiscussionsTray.vue'
import MostDiscussedThreads from '../../components/threads/MostDiscussedThreads.vue'
import Main from '../../components/layout/Main.vue'

const { t } = useI18n()
</script>
<template>
  <div id="ForumIndexView">
    <TopAppBar
      :title="t('forum.title')"
      icon="discussion"
      sticky
    />
    <Banner />
    <NavigationTray>
      <DiscussionsTray />
    </NavigationTray>
    <Main book-layout>
      <MostDiscussedThreads />
    </Main>
  </div>
</template>