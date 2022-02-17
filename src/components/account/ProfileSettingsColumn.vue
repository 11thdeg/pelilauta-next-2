<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useProfile } from '../../stores/profile'
import Column from '../ui/Column.vue'
import Textfield from '../ui/Textfield.vue'
import TextArea from '../ui/TextArea.vue'
import Button from '../ui/Button.vue'
import AvatarSwitcher from './AvatarSwitcher.vue'
import MarkDownSection from '../ui/MarkDownSection.vue';
import ActionBar from '../ui/ActionBar.vue';
import SpacerDiv from '../ui/SpacerDiv.vue';

const t = useI18n().t

const saving = ref(false)
const profile = useProfile()
const nick = ref('')
const avatarURL = ref('')
const bio = ref('')

watch(profile.$state, (value) => {
  nick.value = value.profile.nick
  avatarURL.value = value.profile.avatarURL || ''
  bio.value = value.profile.bio || ''
}, { immediate: true, deep: true })

const disableSaving = computed(() => {
  if (nick.value.length < 4) {
    return true
  }
  return nick.value === profile.$state.profile.nick && avatarURL.value === profile.$state.profile.avatarURL && bio.value === profile.$state.profile.bio
})

async function save () {
  saving.value = true
  await profile.update({ nick: nick.value, avatarURL: avatarURL.value, bio: bio.value })
  saving.value = false
}
</script>

<template>
  <Column>
    <h3>{{ t('profile.settings.title') }}</h3>
    <p>{{ t('profile.settings.description') }}</p>
    <div class="formFields">
      <AvatarSwitcher v-model="avatarURL" />
      <Textfield
        v-model="nick"
        :label="t('profile.fields.nickname')"
      />
      <TextArea
        v-model="bio"
        :label="t('profile.fields.bio')"
      />
      <MarkDownSection :content="bio" />
    </div>
    <ActionBar>
      <SpacerDiv />
      <Button
        :disabled="disableSaving"
        :working="saving"
        @click="save"
      >
        {{ t('actions.save') }}
      </Button>
    </ActionBar>
  </Column>
</template>

<style lang="sass" scoped>
.formFields
  display: flex
  flex-direction: column
  gap: var(--page-grid-gap)
</style>