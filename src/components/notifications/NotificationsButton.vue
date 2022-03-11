<script lang="ts" setup>
import { useAccount } from '../../composables/useAccount';
import { useNotifications } from '../../composables/useNotifications';
import Button from '../ui/Button.vue'

const { newNotificationsCount } = useNotifications()
const { anonymous } = useAccount()
</script>

<template>
  <Button v-if="!anonymous">Notifications {{ newNotificationsCount }}</Button>
</template>