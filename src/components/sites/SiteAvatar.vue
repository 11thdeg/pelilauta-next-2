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
  <div
    v-if="sitename"
    class="SiteAvatar"
  >
    <Icon
      v-if="!avatarURL"
      :icon="badge"
      class="siteAvatarIcon"
    />
    <img
      v-if="avatarURL"
      :src="avatarURL"
      class="siteAvatarImage"
      :alt="sitename"
    >
  </div>
</template>

<style scoped>
.SiteAvatar {
  background-color: rgba(34, 114, 134, 0.22);
  width: 48px;
  box-sizing: border-box;
  border-radius: 50%;
  position: relative;
}
.siteAvatarIcon {
  position: absolute;
  top: 6px;
  left: 6px;
}
  
</style>