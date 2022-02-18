<script lang="ts" setup>
import { Site } from '@11thdeg/skaldstore';
import { computed, onMounted, ref } from 'vue';
import { useSites } from '../../composables/useSites';
import Icon from '../ui/Icon.vue'

const props = defineProps<{
  siteid: string
}>()

const { fetchSite } = useSites()
const site = ref<Site|undefined>(undefined)

onMounted(async () => {
  site.value = await fetchSite(props.siteid)
})

const avatarURL = computed(() => site.value?.avatarURL || '')
const badge = computed(() => site.value?.systemBadge ? site.value.systemBadge + '-logo' : 'd20')
const sitename = computed(() => site.value?.name || '...')
</script>

<template>
  <div class="SiteAvatar" v-if="sitename">
    <Icon
      v-if="!avatarURL"
      :icon="badge"
    />
    <img
      v-if="avatarURL"
      :src="avatarURL"
      class="siteAvatarImage"
      :alt="sitename"
    >
  </div>
</template>