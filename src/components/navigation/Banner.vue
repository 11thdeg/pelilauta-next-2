<script lang="ts" setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useBanner } from '../../composables/useBanner'
import ActionBar from '../ui/ActionBar.vue'
import Button from '../ui/Button.vue'
import SpacerDiv from '../ui/SpacerDiv.vue'

const { show, onCancel, onConfirm, hasAction, text }  = useBanner()

const visible = computed(() => show.value)

const t = useI18n().t

</script>

<template>
  <div id="Banner">
    <transition
      mode="out-in"
      enter-active-class="animate__animated animate__fadeIn"
      leave-active-class="animate__animated animate__fadeOut"
      :duration="200"
    >
      <div
        v-if="visible"
        id="BannerContent"
        class="rise-1"
      >
        <p>{{ text }}</p>
        <ActionBar>
          <SpacerDiv />
          <Button @click="onCancel">
            {{ t('actions.cancel') }}
          </Button>
          <Button
            v-if="hasAction"
            @click="onConfirm"
          >
            {{ t('actions.ok') }}
          </Button>
        </ActionBar>
      </div>
    </transition>
  </div>
</template>

<style lang="sass" scoped>
#BannerContent
  border-top: solid 1px var(--color-border)
  border-bottom: solid 1px var(--color-border)
  margin: 0
  padding: 16px 12px
  p
    margin: 0
    padding: 0
</style>