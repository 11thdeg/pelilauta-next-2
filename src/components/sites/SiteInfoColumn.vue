<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useSite } from '../../composables/useSite'
import Column from '../ui/Column.vue'

const { t } = useI18n()

const props = defineProps<{
  siteid: string
}>()

const { site, updateSite } = useSite(props.siteid)

const sitename = ref('')
const sitenameComp = computed(() => {
  return sitename.value || site.value.name || ''
}) 

const sitedescription = ref('')
const sitedescriptionComp = computed(() => {
  return sitedescription.value || site.value.description || ''
})

const saving = ref(false)

async function toggleVisibility (e: Event) {
  e.preventDefault()
  e.stopPropagation()
  saving.value = true
  await updateSite({ hidden: (e as CustomEvent).detail })
  saving.value = false
}

</script>

<template>
  <Column class="SiteInfoColumn double-cut">
    <h1>
      {{ t('site.settings.info.title') }}
      <cyan-save-interaction
        :active="saving"
        style="display: inline-block"
      />
    </h1>
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
        @change="toggleVisibility($event)"
      />
      <div class="debug">
        {{ site }}
      </div>
    </section>
  </Column>
</template>