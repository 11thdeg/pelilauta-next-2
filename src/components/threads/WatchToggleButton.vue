<script lang="ts" setup>
import ToggleButton from '../ui/ToggleButton.vue'
import { useProfile } from '../../composables/useProfile'
import { computed } from 'vue'
import { logDebug } from '../../utils/loghelpers'


const props = defineProps<{
  thread: {
    key?: string,
    flowTime?: number,
  }
}>()

const profile = useProfile().profile
const { watchThreadAt, unwatchThreadAt } = useProfile()
const checked = computed({
  get: () => profile.value && profile.value.watchThreads.includes(props.thread.key || '') || false,
  set: (value: boolean) => {
    logDebug('checked', value)
    if (value) watchThreadAt(props.thread.key || '', props.thread.flowTime || 0)
    else unwatchThreadAt(props.thread.key || '')
  }
})
</script>

<template>
  <div class="WatchToggleButton">
    <ToggleButton
      v-model="checked"
      icon="eye"
      icon-closed="eye-slash"
    />
    {{ checked }}
  </div>
</template>