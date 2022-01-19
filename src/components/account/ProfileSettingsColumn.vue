<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useProfile } from '../../stores/profile'
import Column from '../ui/Column.vue'
import Textfield from '../ui/Textfield.vue'
import Button from '../ui/Button.vue'

const t = useI18n().t

const saving = ref(false)
const profile = useProfile()
const nickname = ref('')

watch(profile.$state, (value) => {
  nickname.value = value.profile.nickname
}, { immediate: true, deep: true })

const invalidNickname = computed(() => {
  return nickname.value.length < 4
})

async function save () {
  saving.value = true
  await profile.updateNickname(nickname.value)
  saving.value = false
}
</script>

<template>
  <Column>
    <h1>{{ t('profile.settings.title') }}</h1>
    <p>{{ t('profile.settings.description') }}</p>
    <Textfield
      v-model="nickname"
      :label="t('profile.fields.nickname')"
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