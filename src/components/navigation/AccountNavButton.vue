<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { useAccount } from '../../composables/useAccount'
import NavButton from './NavButton.vue'

const { anonymous } = useAccount()
const { t } = useI18n()
</script>

<template>
  <div class="AccountNavButton">
    <NavButton
      v-if="!anonymous"
      class="AccountNavButton__button"
      :to="'/account'"
      icon="avatar"
      :label="t('account.title')"
    />
    <NavButton
      v-if="anonymous"
      class="AccountNavButton__button"
      :to="'/login'"
      icon="logout"
      :label="t('actions.login')"
    />
  </div>
</template>

<style lang="sass" scoped>
div.AccountNavButton
  height: 72px
  width: 72px
  position: relative
  .AccountNavButton__button
    position: absolute
    top: 0
    left: 0
    
</style>