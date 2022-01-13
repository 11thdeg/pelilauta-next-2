<script lang="ts" setup>
import { useAuthz } from '../../stores/authz';
import Column from '../ui/Column.vue'

const { user } = useAuthz()

</script>

<template>
  <Column class="AccountSettingsPane">
    <h1>Account Settings</h1>
    <h2>Sign-on info</h2>
    <p class="lowEmphasis">This data is provided to the App by your authentication provider, and it is stored
      by Pelilauta for administrative purposes.</p>
    <div class="dataGrid">
      <p class="headCell">Display name</p>
      <p>
        {{ user.displayName }}
      </p>
      <p class="headCell">Email</p>
      <p>
        {{ user.email }}
      </p>
      <p class="headCell">uid</p>
      <p>
        <span class="code">{{ user.uid }}</span>
      </p>
      <p class="headCell">Provider</p>
      <p>
        {{ user.providerId }}
      </p>
    </div>
  </Column>
</template>

<style lang="sass" scoped>
@import ../../styles/typography-mixins.sass

div.dataGrid
  display: grid
  grid-template-columns: 1fr 4fr
  p
    @include TypeBody2()
    margin: 6px 0
  p.headCell
    font-weight: 700

</style>