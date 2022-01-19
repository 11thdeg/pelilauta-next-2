<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useProfile } from '../../stores/profile'
import Column from '../ui/Column.vue'
import Textfield from '../ui/Textfield.vue'
import Button from '../ui/Button.vue';

const t = useI18n().t

const saving = ref(false)
const { profile, saveToFirebase } = useProfile()
const nickname = computed({
  get: () => (profile?.nickname || ''),
  set: (value:string) => {
    if (profile) profile.nickname = value
  }
})

const invalidNickname = computed(() => {
  return nickname.value.length < 4
})

async function save () {
  saving.value = true
  await saveToFirebase()
  saving.value = false
}
</script>

<template>
  <Column>
    <h1>{{ t('profile.settings.title') }}</h1>
    <p>{{ t('profile.settings.description') }}</p>
    <Textfield
      v-model="nickname"
      :label="t('profile.settings.nickname')"
    />
    <Button
      :disabled="invalidNickname"
      :working="saving"
      @click="save"
    >
      {{ t('actions.save') }}
    </Button>
  </Column>
</template>