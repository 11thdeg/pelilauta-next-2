<script lang="ts" setup>
import { PublicProfile, useProfiles } from '../composables/useProfiles'
import Loader from '../components/ui/Loader.vue'
import { computed, onMounted, ref } from 'vue'
import Column from '../components/ui/Column.vue'
import TopAppBar from '../components/navigation/TopAppBar.vue';
import { useI18n } from 'vue-i18n';
import MarkDownSection from '../components/ui/MarkDownSection.vue';

const props = defineProps<{
  uid: string
}>()

const { fetchProfile } = useProfiles()
const t = useI18n().t

const profile = ref<PublicProfile|undefined>(undefined)

onMounted(async () => {
  profile.value = await fetchProfile(props.uid)
})

const nick = computed(() => profile.value?.nick || '')
</script>

<template>
  <TopAppBar 
    :title="t('bio.title') +' – ' + nick"
  />
  <main class="singleColumnLayout">
    <Column>
      <Loader v-if="!profile" />
      <section v-else>
        <img
          :src="profile.avatarURL"
          class="avatar"
        >
        <h1>{{ profile.nick }}</h1>
        <MarkDownSection :content="profile.bio" />
      </section>
    </Column>
  </main>
</template>

<style lang="sass" scoped>
.avatar
  width: 100px
  height: 100px
  border-radius: 50%
  margin-right: 12px
  float: left
</style>