<script lang="ts" setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import FabTray from '../navigation/FabTray.vue'
import Fab from '../ui/Fab.vue'

const props = defineProps<{
  siteid: string
  pageid?: string
}>()

const { t } = useI18n()

const pageSlug = computed(() => props.pageid || props.siteid)
const discussionPage = computed(() => props.pageid ? '/' + props.pageid : '')
</script>
<template>
  <FabTray>
    <Fab
      icon="edit"
      :label="t('actions.edit')"
      @click.prevent="$router.push(`/sites/${siteid}/pages/${pageSlug}/edit`)"
    />
    <Fab
      small
      secondary
      icon="discussion"
      :label="t('actions.addThread')"
      @click.prevent="`/sites/${siteid}/add/thread${discussionPage}`"
    />
  </FabTray>
</template>