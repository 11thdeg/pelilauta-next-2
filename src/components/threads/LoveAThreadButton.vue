<script lang="ts" setup>
import { computed } from 'vue'
import { useProfile } from '../../composables/useProfile'
import { loveThread, unLoveThread } from '../../composables/useTheads'
import { logDebug } from '../../utils/loghelpers'
import LoveButton from '../actions/LoveButton.vue'

const props = defineProps<{
  thread: {
    key?: string
    lovedCount: number
    hasOwner: (uid: string) => boolean
  }
}>()

const { profile } = useProfile()
const loves = computed(
  {
    get: () => profile.value?.loves(props.thread.key || '') || false,
    set: async (value: boolean) => {
      logDebug('loves', value)
      if (value) await loveThread(profile.value?.key || '', props.thread.key || '')
      else await unLoveThread(profile.value?.key || '', props.thread.key || '')
    }
  }
)
const owns = computed(() => props.thread.hasOwner(profile.value?.key || ''))
</script>

<template>
  <LoveButton
    v-model:loves="loves"
    :count="thread.lovedCount"
    :disabled="owns"
  />
</template>