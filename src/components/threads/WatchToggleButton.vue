<script lang="ts" setup>
import ToggleButton from '../ui/ToggleButton.vue'
import { useProfile } from '../../composables/useProfile'
import { computed } from 'vue'


const props = defineProps<{
  thread: {
    key?: string
  }
}>()

const profile = useProfile().profile
const checked = computed({
  get: () => profile.value && profile.value.watchThreads.includes(props.thread.key || '') || false,
  set: (value: boolean) => {
    if (value) profile?.value?.watchThreadAt(props.thread.key || '', new Date().getTime())
    else profile?.value?.unWatchThread(props.thread.key || '')
  }
})
</script>

<template>
  <div class="WatchToggleButton">
    <ToggleButton
      v-model="checked"
    />
  </div>
</template>