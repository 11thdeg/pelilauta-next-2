<script lang="ts" setup>
import { useAuthz } from '../../stores/authz';
import { toDisplayString } from '../../utils/firestoreHelpers';
import Column from '../ui/Column.vue'
import Button from '../ui/Button.vue';

const { user } = useAuthz()
const lastUpdated = toDisplayString(user.updatedAt)

</script>

<template>
  <Column class="AccountSettingsPane">
    <h1>Account Data</h1>
    <section>
      <h2>Sign-on info</h2>
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
    </section>
    <section>
      <h2>App Metadata</h2>
      <p>This data is managed by the App, and stored to your private profile visible only to you and the administrative users</p>
      <div class="dataGrid">
        <p class="headCell">
          LightMode
        </p>
        <p>
          [{{ user.lightMode }}]
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
    <section class="actions">
      <Button text>
        Erase my account
      </Button>
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
  p.headCell
    font-weight: 700

</style>