<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import CallToActionSection from './CallToActionSection.vue'
import Button from '../ui/Button.vue'

const { t } = useI18n()
</script>
<template>
  <CallToActionSection
    :title="t('cta.createSite.title')"
    posterurl="/proprietary/images/wootha-public-domain-talk-to-me.jpeg"
  >
    <template #default>
      <p style="color: var(--chroma-secondary-i)">
        {{ t('cta.createSite.content') }}
      </p>
    </template>
    <template #actions>
      <Button
        text
        @click.prevent="$router.push('/sites/all')"
      >
        {{ t('cta.createSite.list') }}
      </Button>
      <Button @click.prevent="$router.push('/create/site')">
        {{ t('cta.createSite.add') }}
      </Button>
    </template>
  </CallToActionSection>
</template>