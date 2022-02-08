<script lang='ts' setup>import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { PublicProfile, useProfiles } from '../../composables/useProfiles';

const props = defineProps<{
  uid: string
}>()

const { fetchProfile } = useProfiles()
const profile = ref<PublicProfile | undefined>(undefined)

const t = useI18n().t

onMounted(async () => {
  profile.value = await fetchProfile(props.uid)
})
</script>

<template>
  <div class="AuthorTag">
    <template v-if="profile">
      <template v-if="profile.exists">
        <router-link :to="`/bio/${profile.uid}`">
          {{ profile.nick }}
        </router-link>
      </template>
      <template v-else>
        <router-link :to="`/meta/precursor`">
          {{ t('bio.precursor.title') }}
        </router-link>
      </template>
    </template>
    <template v-else>
      ...
    </template>
  </div>
</template>