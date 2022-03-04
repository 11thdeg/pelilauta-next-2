<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import Column from '../ui/Column.vue'
import LocaleSwitcher from '../app/LocaleSwitcher.vue'
import LogoutButton from './LogoutButton.vue'
import LightmodeButton from '../app/LightmodeButton.vue'
import Button from '../ui/Button.vue'

const t = useI18n().t

</script>
<template>
  <Column>
    <h3>{{ t('account.actions.title') }}</h3>
    <section class="titledList">
      <h4>{{ t('account.actions.locale') }}</h4>
      <LocaleSwitcher />
      <h4>{{ t('account.actions.lightmode') }}</h4>
      <LightmodeButton />
    </section>
    <LogoutButton />
    <Button
      icon="delete"
      text
      @click.prevent="$router.push('/account/delete')"
    >
      {{ t('account.delete.title') }}
    </Button>
  </Column>
</template>