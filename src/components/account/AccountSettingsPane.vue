<script lang="ts" setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAuthz } from '../../stores/authz'
import { useProfile } from '../../stores/profile'
import { toDisplayString } from '../../utils/firestoreHelpers'
import Column from '../ui/Column.vue'

const { user } = useAuthz()
const profileState = useProfile()
const t = useI18n().t

const lastUpdated = toDisplayString(user.updatedAt)
const nickname = computed(() => profileState.$state.profile.nick)
const avatarURL = computed(() => profileState.$state.profile.avatarURL || '')


</script>

<template>
  <Column class="AccountSettingsPane">
    <h3>Personal Data</h3>
    <section>
      <h4>Sign-on info</h4>
      <p class="lowEmphasis">
        This data is provided to the App by your authentication provider, and it is stored
        by Pelilauta for administrative purposes.
      </p>
      <div class="dataGrid">
        <p class="headCell">
          Display name
        </p>
        <p>
          {{ user.displayName }}
        </p>
        <p class="headCell">
          Email
        </p>
        <p>
          {{ user.email }}
        </p>
        <p class="headCell">
          uid
        </p>
        <p>
          <span class="code">{{ user.uid }}</span>
        </p>
        <p class="headCell">
          Provider
        </p>
        <p>
          {{ user.providerId }}
        </p>
      </div>
      <p class="TypeBody2 lowEmphasis">
        This data is not erased automatically, when you delete your profile, as it's not saved to the App data. The Authentication scrapped manually for 
        users who's data is deleted from the platform.
      </p>
      <p class="TypeBody2 lowEmphasis">
        More info on how Firestore saves the authentication data can be found here 
        <a href="https://firebase.google.com/support/privacy">https://firebase.google.com/support/privacy</a>
      </p>
      <p class="TypeBody2 lowEmphasis">
        More info on what data is saved from your logins, can be found on the source code responsible for the Account persistence: 
        <a href="https://github.com/11thdeg/skaldstore/blob/main/src/Account.ts">https://github.com/11thdeg/skaldstore/blob/main/src/Account.ts</a>
      </p>
    </section>
    <section>
      <h4>App Metadata</h4>
      <p>This data is managed by the App, and stored to your private profile visible only to you and the administrative users</p>
      <div class="dataGrid">
        <p class="headCell">
          LightMode
        </p>
        <p>
          {{ user.lightMode }}
        </p>
        <p class="headCell">
          Last login
        </p>
        <p>
          {{ lastUpdated }}
        </p>
        <p class="headCell">
          UI Locale
        </p>
        <p>
          {{ user.locale }}
        </p>
      </div>
    </section>
    <section>
      <h4>{{ t('profile.title') }}</h4>
      <div class="titledList">
        <h4>{{ t('profile.fields.nickname') }}</h4>
        <p>{{ nickname }}</p>
        <h4>{{ t('profile.fields.avatarurl') }}</h4>
        <p>
          <a
            :href="avatarURL"
            target="_new"
          >{{ avatarURL }}</a>
        </p>
      </div>
    </section>
  </Column>
</template>

<style lang="sass" scoped>
@import ../../styles/typography-mixins.sass

div.dataGrid
  display: grid
  grid-template-columns: 1fr 3fr
  p
    @include TypeBody2()
    margin: 6px 0
    @include dont-break-out()
  p.headCell
    font-weight: 700

</style>