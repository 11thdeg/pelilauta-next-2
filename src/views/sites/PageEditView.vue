<script lang="ts" setup>
import { Page } from '@11thdeg/skaldstore';
import { computed, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import TopAppBar from '../../components/navigation/TopAppBar.vue'
import Main from '../../components/layout/Main.vue';
import Loader from '../../components/ui/Loader.vue';
import { usePages } from '../../composables/usePages';
import { logDebug, logError } from '../../utils/loghelpers';
import SiteTray from '../../components/sites/SiteTray.vue';
import NavigationTray from '../../components/navigation/NavigationTray.vue';
import Column from '../../components/ui/Column.vue';
import Textfield from '../../components/ui/Textfield.vue';
import MarkdownArea from '../../components/ui/MarkdownArea.vue';
import { useBanner } from '../../composables/useBanner';
import { NodeHtmlMarkdown } from 'node-html-markdown';
import Banner from '../../components/navigation/Banner.vue';

const props = defineProps<{
  siteid: string
  pageid?: string
}>()

const { t } = useI18n()
const { raise } = useBanner()

const MODE_CREATE = 'create'
const MODE_UPDATE = 'update'

const page= ref<Page|null>(!props.pageid ? new Page() : null)

const mode = computed(() => !!props.pageid ? MODE_UPDATE : MODE_CREATE)
const title = computed(() => mode.value === MODE_CREATE ? t('page.create.title') : t('page.update.title'))
const loading = computed(() => page.value === null && !pageNotFound.value)
const pageNotFound = ref(false)

onMounted(async() => {
  const { fetchPage } = await usePages()
  try {
    const p = await fetchPage(props.pageid || '', props.siteid)
    logDebug('PageEditView.onMounted', p, p.htmlContent && !p.markdownContent)
    page.value = p
    if (p.htmlContent && !p.markdownContent) {
      raise(t('page.convert.warning'), convertPageContentToMarkdown)
    }
  } catch (e) {
    logError('PageEditView.onMounted', e)
    pageNotFound.value = true
  }
})

const nhm = new NodeHtmlMarkdown({}, undefined, undefined)

function convertPageContentToMarkdown() {
  if (page.value && !page.value.markdownContent) page.value.markdownContent = nhm.translate(page.value.htmlContent, {})
  else throw new Error('PageEditView.convertPageContentToMarkdown: page.value.markdownContent is already set')
}

</script>

<template>
  <TopAppBar
    :title="title"
    show-back-button
    sticky
  />
  <Banner />
  <NavigationTray>
    <SiteTray :siteid="siteid" />
  </NavigationTray>
  
  <Main>
    <Loader v-if="loading" />
    <Column v-else>
      <template v-if="pageNotFound">
        <h1>{{ t('page.notFound.title') }}</h1>
        <p>{{ t('page.notFound.message') }}</p>
      </template>
      <template v-if="page && !pageNotFound">
        <Textfield
          v-model="page.name"
          :label="t('page.fields.name')"
        />
        <br>
        <MarkdownArea
          v-model="page.markdownContent"
          :label="t('page.fields.content')"
        />
      </template>
    </Column>
  </Main>
</template>