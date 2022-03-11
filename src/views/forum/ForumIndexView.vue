<script lang="ts" setup>
import TopAppBar from '../../components/navigation/TopAppBar.vue'
import Banner from '../../components/navigation/Banner.vue'
import NavigationTray from '../../components/navigation/NavigationTray.vue'
import { useI18n } from 'vue-i18n'
import DiscussionsTray from '../../components/dicsussion/DiscussionsTray.vue'
import MostDiscussedThreads from '../../components/threads/MostDiscussedThreads.vue'
import Main from '../../components/layout/Main.vue'
import MostLovedThreads from '../../components/threads/MostLovedThreads.vue'
import StickyThreads from '../../components/threads/StickyThreads.vue'

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
      <StickyThreads />
      <MostDiscussedThreads />
      <MostLovedThreads />
    </Main>
  </div>
</template>