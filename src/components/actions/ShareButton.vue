<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { useSnack } from '../../composables/useSnack'
import Button from '../ui/Button.vue'

const { t } = useI18n()
const { pushSnack } = useSnack()

function copyUrl ():void {
  navigator.clipboard.writeText(window.location.href)
  pushSnack('share.copied')
}

</script>

<template>
  <Button
    text
    icon="share"
    @click.prevent="copyUrl"
  >
    {{ t('actions.share') }}
  </Button>
</template>