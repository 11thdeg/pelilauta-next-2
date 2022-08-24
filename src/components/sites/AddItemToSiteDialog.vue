<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useSite } from '../../composables/useSite'
import Dialog from '../ui/Dialog.vue'
import Fab from '../ui/Fab.vue'
import Button from '../ui/Button.vue'

const props = defineProps<{
  siteid: string
}>()

const { t } = useI18n()
const { site } = useSite(props.siteid)
const open = ref(false)
</script>

<template>
  <Fab
    small
    icon="add"
    :label="t('actions.add')"
    @click.prevent="open = true"
  />
  <Dialog
    v-model="open"
    :label="t('actions.add')"
  >
    <p>
      <Button text>
        {{ t('actions.addPage') }}
      </Button>
      <Button text>
        {{ t('actions.addLink') }}
      </Button>
      <Button text>
        {{ t('actions.addDiscussion') }}
      </Button>
    </p>
    <p> {{ site }}</p>
  </Dialog>
</template>