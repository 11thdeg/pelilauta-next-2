<script lang="ts" setup>
import { computed } from 'vue';
import { useAuthz } from '../../stores/authz';
import Icon from '../ui/Icon.vue'

const authz = useAuthz()

const anonymous = computed(() => authz.anonymous)
const targetRoute = computed(() => {
  if (anonymous.value) {
    return '/login'
  }
  return '/account'
})
</script>

<template>
  <div
    class="AvatarButton"
    :class="{anonymous: anonymous}"
    @click.prevent="$router.push(targetRoute)"
  >
    <Icon
      icon="avatar"
      medium
      class="hoverable clickable"
    />
  </div>
</template>

<style lang="sass" scoped>
div.AvatarButton
  height: 64px
  width: 64px
  box-sizing: border-box
  margin: 0
  padding: calc((64px - 36px) / 2)
  opacity: 0.83
  transition: all 0.2s ease-in-out
  &.anonymous
    opacity: 0.5
    &:hover
      opacity: 0.83
</style>
