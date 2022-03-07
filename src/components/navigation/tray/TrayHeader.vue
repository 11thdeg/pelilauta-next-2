<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
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
const selected = computed(() => props.active || props.to === route.fullPath)

function moveUp () {
  emit('moveUp')
}

function moveDown () {
  emit('moveDown')
}

</script>

<template>
  <div
    class="TrayHeader"
    :class="{ selected: selected }"
  >
    <router-link
      v-if="to"
      :to="to"
    >
      <Icon
        v-if="icon"
        :icon="icon"
      />
      <h3>{{ label }}</h3>
    </router-link>
    <template v-else>
      <Icon
        v-if="icon"
        :icon="icon"
      />
      <h3>{{ label }}</h3>
    </template>
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
}
div.TrayHeader a {
  color: var(--color-high);
}
</style>