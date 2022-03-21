<script lang="ts" setup>import { Site } from '@11thdeg/skaldstore';
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useSites } from '../../composables/useSites';
import Column from '../ui/Column.vue';
import SinceTag from '../ui/SinceTag.vue';

const props = defineProps<{
  siteid: string
}>()

const { t } = useI18n()
const { fetchSite } = useSites()

const site = ref(new Site())

onMounted(async () => {
  site.value = await fetchSite(props.siteid)
})
</script>

<template>
  <Column class="SiteMetaColumn">
    <p>{{ t('site.fields.createdAt') }} <SinceTag :time="site.createdAt" /></p>
    <p>{{ t('site.fields.updatedAt') }} <SinceTag :time="site.updatedAt" /></p>
    <p>{{ t('site.fields.flowTime') }} <SinceTag :time="site.flowTime" /></p>
  </Column>
</template>