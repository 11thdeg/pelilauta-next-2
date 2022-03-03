<script lang='ts' setup>import { Profile } from '@11thdeg/skaldstore';
import { computed, onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useProfiles } from '../../composables/useProfiles';

const props = defineProps<{
  uid: string
}>()

const { fetchProfile } = useProfiles()
const profile = ref<Profile | undefined>(undefined)

const t = useI18n().t

onMounted(async () => {
  profile.value = await fetchProfile(props.uid)
})

const nick = computed(() => {
  if (!profile.value) return t('info.loading')
  if (!profile.value.uid) return t('bio.precursor.title')
  return profile.value.nick.trim()
})

const route = computed(() => {
  if (!profile.value) return ''
  if (!profile.value.uid) return '/meta/precursor'
  return `/bio/${profile.value.uid}`
})
</script>

<template>
  <div class="AuthorTag TypeCaption">
    <router-link
      v-if="profile"
      :to="route"
    >
      @{{ nick }}
    </router-link>
    <span
      v-else
      class="loading"
    >
      @{{ nick }}
    </span>
  </div>
</template>

<style lang="sass" scoped>
#app .AuthorTag
  display: inline-block
  height: 20px
  min-width: 72px
  background-color: var(--color-tag-background)
  margin: 3px 0
  padding: 0 8px
  line-height: 20px
  border-radius: 10px
  color: var(--color-tag-text)
  text-align: center
  font-weight: bold
  a
    color:  var(--color-tag-text)
</style>
