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
const { site, addLink } = useSite(props.siteid)
const open = ref(false)
const showLinkDialog = ref(false)
const title = ref('')
const link = ref('')

function closeLinkDialog () {
  showLinkDialog.value = false
  title.value = ''
  link.value = ''
}

function add () {
  if (!title.value) link.value = title.value
  addLink(title.value, link.value)
  closeLinkDialog()
}

</script>

<template>
  <Fab
    small
    icon="add"
    :label="t('actions.add')"
    @click.prevent="open = true"
  />
  <cyan-menu :open="open">
    <cyan-menu-item @click="showLinkDialog = true">
      {{ t('actions.addLink') }}
    </cyan-menu-item>
    <cyan-menu-item :route="`/site/${site.key}/add/page`">
      {{ t('actions.addPage') }}
    </cyan-menu-item>
    <cyan-menu-item :route="`/site/${site.key}/add/thread`">
      {{ t('actions.addThread') }}
    </cyan-menu-item>
  </cyan-menu>
  <Dialog
    v-model="showLinkDialog"
    :label="t('actions.addLink')"
    @close="closeLinkDialog"
  >
    <cyan-textfield
      v-model="title"
      label="{{t('actions.title')}}"
    />
    <cyan-textfield
      v-model="link"
      label="{{t('actions.link')}}"
    />
    <Button
      text
      @click="closeLinkDialog"
    >
      {{ t('actions.cancel') }}
    </Button>
    <Button
      primary
      @click="add"
    >
      {{ t('actions.add') }}
    </Button>
  </Dialog>
</template>