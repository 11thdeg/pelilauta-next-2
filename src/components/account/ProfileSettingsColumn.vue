<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useProfile } from '../../stores/profile'
import Column from '../ui/Column.vue'
import Textfield from '../ui/Textfield.vue'
import Textarea from '../ui/Textarea.vue'
import Button from '../ui/Button.vue'
import AvatarSwitcher from './AvatarSwitcher.vue'
import MarkDownSection from '../ui/MarkDownSection.vue';

const t = useI18n().t

const saving = ref(false)
const profile = useProfile()
const nickname = ref('')
const avatarURL = ref('')
const bio = ref('')

watch(profile.$state, (value) => {
  nickname.value = value.profile.nickname
  avatarURL.value = value.profile.avatarURL || ''
  bio.value = value.profile.bio || ''
}, { immediate: true, deep: true })

const disableSaving = computed(() => {
  if (nickname.value.length < 4) {
    return true
  }
  return nickname.value === profile.$state.profile.nickname && avatarURL.value === profile.$state.profile.avatarURL && bio.value === profile.$state.profile.bio
})

async function save () {
  saving.value = true
  await profile.update({ nickname: nickname.value, avatarURL: avatarURL.value, bio: bio.value })
  saving.value = false
}
</script>

<template>
  <Column>
    <h1>{{ t('profile.settings.title') }}</h1>
    <p>{{ t('profile.settings.description') }}</p>
    <AvatarSwitcher v-model="avatarURL" />
    <Textfield
      v-model="nickname"
      :label="t('profile.fields.nickname')"
    />
    <Textarea
      v-model="bio"
      :label="t('profile.fields.bio')"
    />
    <MarkDownSection :content="bio" />
    <Button
      :disabled="disableSaving"
      :working="saving"
      @click="save"
    >
      {{ t('actions.save') }}
    </Button>
  </Column>
</template>