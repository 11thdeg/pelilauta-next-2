<script lang="ts" setup>
import { Site } from '@11thdeg/skaldstore'
import { computed, onMounted, ref } from 'vue'
import { useSites } from '../../composables/useSites'

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
    <div
      v-if="!avatarURL"
      class="badgeContainer"
    >
      <cyan-icon
        :noun="badge"
        light
      />
    </div>
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
  background-color: --chroma-secondary-a;
  width: 48px;
  box-sizing: border-box;
  border-radius: 50%;
  position: relative;
  height: 48px;
  flex-shrink: 0;
}
.badgeContainer {
  height: 40px;
  width: 40px;
  margin: 4px;
  padding: 2px;
  background-color: var(--theme-color-primary-tint);
  box-sizing: border-box;
  border-radius: 50%;
}
.siteAvatarIcon {
  position: absolute;
  top: 6px;
  left: 6px;
}
  
</style>