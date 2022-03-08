<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import TopAppBar from '../../components/navigation/TopAppBar.vue'
import Main from '../../components/layout/Main.vue'
import { Thread } from '@11thdeg/skaldstore'
import { computed, onMounted, ref } from 'vue'
import Loader from '../../components/ui/Loader.vue'
import { useThreads } from '../../composables/useTheads'
import Textfield from '../../components/ui/Textfield.vue'

const props = defineProps<{
  threadid: string
}>()

const { t } = useI18n()
const { fetchThread } = useThreads()

const thread = ref(new Thread())
const loading = computed(() => !(thread.value.title || notFound.value))
const notFound = ref(false)

onMounted(async () => {
  const tr = await fetchThread(props.threadid)
  if (tr) {
    thread.value = tr
  } else {
    notFound.value = true
  }
})

</script>

<template>
  <TopAppBar
    :title="t('editThread.title')"
    show-back-button
    sticky
  />
  <Main>
    <Loader v-if="loading" />
    <template v-if="!loading && notFound">
      <h1>{{ t('editThread.notFound') }}</h1>
    </template>
    <template v-if="!loading && !notFound">
      <Textfield
        v-model="thread.title"
        :label="t('thread.fields.title')"
      />
    </template>
  </Main>
</template>