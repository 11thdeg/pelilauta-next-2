<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Icon from '../../ui/Icon.vue'
import SpacerDiv from '../../ui/SpacerDiv.vue'

const props = defineProps<{
  to?: string
  icon?: string
  label: string
  active?: boolean
  tools?: boolean
}>()

const emit = defineEmits<{
  (e: 'moveUp'): void
  (e: 'moveDown'): void
}>()

const route = useRoute()
const router = useRouter()
const selected = computed(() => props.active || props.to === route.fullPath)

function moveUp () {
  emit('moveUp')
}

function moveDown () {
  emit('moveDown')
}

function reroute () {
  if (props.to && props.to !== route.fullPath) {
    router.push(props.to)
  }
}

</script>

<template>
  <div
    class="TrayHeader"
    :class="{ selected: selected }"
    @click.prevent="reroute"
  >
    <Icon
      v-if="icon"
      :icon="icon"
    />
    <h3>{{ label }}</h3>
    <template v-if="tools">
      <SpacerDiv />
      <Icon
        :icon="'chevron-up'"
        class="clickable hoverable"
        @click="moveUp()"
      />
      <Icon
        :icon="'chevron-down'"
        class="clickable hoverable"
        @click="moveDown()"
      />
    </template>
  </div>
</template>

<style scoped>
div.TrayHeader {
  display: flex;
  gap: var(--page-grid-gap);
}
div.TrayHeader a {
  color: var(--color-high);
}
</style>