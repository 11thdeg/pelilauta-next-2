<script lang="ts" setup>
import { Page, Site } from '@11thdeg/skaldstore'
import { computed, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import TopAppBar from '../../components/navigation/TopAppBar.vue'
import Main from '../../components/layout/Main.vue'
import Loader from '../../components/ui/Loader.vue'
import { usePages } from '../../composables/usePages'
import { logDebug, logError } from '../../utils/loghelpers'
import SiteTray from '../../components/sites/SiteTray.vue'
import NavigationTray from '../../components/navigation/NavigationTray.vue'
import Column from '../../components/ui/Column.vue'
import Textfield from '../../components/ui/Textfield.vue'
import MarkdownArea from '../../components/ui/MarkdownArea.vue'
import { useBanner } from '../../composables/useBanner'
import { NodeHtmlMarkdown } from 'node-html-markdown'
import Banner from '../../components/navigation/Banner.vue'
import ActionBar from '../../components/ui/ActionBar.vue'
import PageCategorySelect from '../../components/page/PageCategorySelect.vue'
import { useSites } from '../../composables/useSites'
import Button from '../../components/ui/Button.vue'
import SpacerDiv from '../../components/ui/SpacerDiv.vue'
import { useAuthz } from '../../stores/authz'
import { marked } from 'marked'
import { useRouter } from 'vue-router'

const props = defineProps<{
  siteid: string
  pageid?: string
}>()

// Helpers and composables
const { t } = useI18n()
const { raise } = useBanner()
const { fetchPage, createPage, updatePage } = usePages()
const { fetchSite } = useSites()
const { user } = useAuthz()
const nhm = new NodeHtmlMarkdown({}, undefined, undefined)
const router = useRouter()

// The view has two modes:
const MODE_CREATE = 'create'
const MODE_UPDATE = 'update'

// Reactive
const page= ref<Page|null>(!props.pageid ? new Page() : null)
const mode = computed(() => !!props.pageid ? MODE_UPDATE : MODE_CREATE)
const title = computed(() => mode.value === MODE_CREATE ? t('page.create.title') : t('page.update.title'))
const loading = computed(() => page.value === null && !pageNotFound.value)
const pageNotFound = ref(false)
const site = ref<Site|undefined>()

onMounted(async() => {
  // Just in case we have not initialized the site state yet
  site.value = await fetchSite(props.siteid)

  // We need to fetch the page if we are in the update mode
  if (mode.value === MODE_CREATE) return
  
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

function convertPageContentToMarkdown() {
  if (page.value && !page.value.markdownContent) page.value.markdownContent = nhm.translate(page.value.htmlContent)
  else throw new Error('PageEditView.convertPageContentToMarkdown: page.value.markdownContent is already set')
}

async function postForm () {
  if (!page.value || !page.value.markdownContent || !page.value.name) return
  const p = page.value as Page
  p.owners = [user.uid]
  p.htmlContent = marked(p.markdownContent)
  if (mode.value === MODE_CREATE) {
    logDebug('PageEditView.postForm: create', p.docData)
    const pageDoc = await createPage(p)
    router.push(`/site/${props.siteid}/page/${pageDoc.id}`)
  }
  else {
    logDebug('PageEditView.postForm: update', p.docData)
    await updatePage(p)
    router.push(`/site/${props.siteid}/page/${p.key}`)
  }
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
        <ActionBar>
          <PageCategorySelect
            v-if="site"
            :site="site"
            v-model:selected="page.category"
          />
          <SpacerDiv />
          <Button
            text
            @click="$router.back()"
          >
            {{ t('actions.cancel') }}
          </Button>
          <Button
            :disabled="!page.name || !page.markdownContent"
            @click.prevent="postForm()"
          >
            {{ t('actions.save') }}
          </Button>
        </ActionBar>
      </template>
    </Column>
  </Main>
</template>