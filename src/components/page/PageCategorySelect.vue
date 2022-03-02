<script lang="ts" setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { logDebug } from '../../utils/loghelpers';
import Select from '../ui/Select.vue';


const props = defineProps<{
  site: {
    key?: string
    pageCategories?: {
      slug: string,
      name: string }[]
  },
  disabled?: boolean,
  selected: string
}>()

const { t } = useI18n()

const hasCategories = computed(() => props.site.pageCategories && props.site.pageCategories.length > 0)
const disabled = computed(() => props.disabled || !hasCategories.value)
const options = computed(() => {
  const opts:Record<string, string> = {}
  props.site.pageCategories?.forEach(category => {
    opts[category.slug] = category.name
  })
  return opts
})

const selected = computed({
  get: () => props.selected,
  set: (value) => {
    logDebug('PageCategorySelect.vue: selected.set', value)
  }
})

</script>

<template>
  <div class="PageCategorySelect">
    <Select
      v-if="hasCategories"
      v-model="selected"
      :label="t('page.fields.category')"
      :options="options"
      :disabled="disabled"
    />
    <span
      v-else
      class="TypeButton"
    >
      {{ t('page.noCategoriesAvailable') }}
    </span>
  </div>
</template>