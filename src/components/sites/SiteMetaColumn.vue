<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import Column from '../ui/Column.vue'
import { toDisplayString } from '../../utils/firestoreHelpers'
import { useSite } from '../../composables/useSite'

const props = defineProps<{
  siteid: string
}>()
const { t } = useI18n()
const { site } = useSite(props.siteid)

</script>

<template>
  <Column class="SiteMetaColumn">
    <p>{{ t('site.fields.createdAt') }} {{ toDisplayString(site.createdAt) }}</p>
    <p>{{ t('site.fields.updatedAt') }} {{ toDisplayString(site.updatedAt) }}</p>
    <p>{{ t('site.fields.flowTime') }} {{ toDisplayString(site.flowTime) }}</p>
  </Column>
</template>