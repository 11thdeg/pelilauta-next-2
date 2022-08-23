<script setup lang="ts">
import { Site } from '@11thdeg/skaldstore'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import Column from '../ui/Column.vue'

const { t } = useI18n()

const props = defineProps<{
  site: { name: string, description: string, hidden: boolean }
}>()

const s = computed(() => {
  return props.site || new Site()
})

const sitename = ref('')
const sitenameComp = computed(() => {
  return sitename.value || s.value.name || ''
}) 

const sitedescription = ref('')
const sitedescriptionComp = computed(() => {
  return sitedescription.value || s.value.description || ''
})

</script>

<template>
  <Column class="SiteInfoColumn double-cut">
    <h1>{{ t('site.settings.info.title') }}</h1>
    <section class="verticalList">
      <cyan-textfield
        :label="t('site.fields.name')"
        :value="sitenameComp"
      />
      <cyan-textfield
        :label="t('site.fields.description')"
        :value="sitedescriptionComp"
      />
      <cyan-toggle
        :label="t('site.fields.hidden')"
        :checked="site.hidden"
      />
      <div class="debug">
        {{ s }}
      </div>
    </section>
  </Column>
</template>