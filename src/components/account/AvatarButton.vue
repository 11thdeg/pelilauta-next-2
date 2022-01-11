<script lang="ts" setup>
import { computed } from 'vue';
import { useAuthz } from '../../stores/authz';
import Icon from '../ui/Icon.vue'

const authz = useAuthz()

const anonymous = computed(() => authz.anonymous)
</script>

<template>
  <div
    class="AvatarButton"
    :class="{anonymous: anonymous}"
  >
    <Icon
      icon="avatar"
      medium
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
